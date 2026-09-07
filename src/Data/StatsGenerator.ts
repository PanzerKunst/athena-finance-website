import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

// The script lives next to the data it reads, so the CSV is found wherever the script is run from
const dataDirectoryPath = import.meta.dirname
const generatedFileName = "GeneratedStats.ts"

const millisecondsPerDay = 24 * 60 * 60 * 1000
const daysPerWeek = 7

const shortPeriodDays = 30
const longPeriodMonths = 6

// Bybit writes its timestamps as `HH:MM YYYY-MM-DD`, with no timezone offset
const timestampPattern = /^(\d{2}):(\d{2}) (\d{4})-(\d{2})-(\d{2})$/

// `en-US` rather than `en-GB`: the latter shortens September to "Sept" in recent CLDR releases
const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" })

type ClosedPosition = {
  closedAt: number;
  pnl: number;
  volume: number;
}

type PnlBucket = {
  startedAt: number;
  endedAt: number; // Exclusive
  pnl: number;
}

type PeriodStats = {
  buckets: PnlBucket[];
  volume: number;
}

function firstCsvFilePath(): string {
  const csvFileName = readdirSync(dataDirectoryPath)
    .sort()
    .find(fileName => fileName.toLowerCase().endsWith(".csv"))

  if (!csvFileName) {
    throw new Error(`No CSV file was found in "${dataDirectoryPath}"`)
  }

  return join(dataDirectoryPath, csvFileName)
}

// A hand-rolled parser rather than a split on commas: the fee-info columns hold quoted JSON,
// commas included
function parseCsv(csvText: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let isInQuotes = false

  for (let index = 0; index < csvText.length; index++) {
    const character = csvText.charAt(index)

    if (isInQuotes) {
      if (character !== "\"") {
        field += character
      } else if (csvText.charAt(index + 1) === "\"") {
        field += "\""
        index++
      } else {
        isInQuotes = false
      }
    } else if (character === "\"") {
      isInQuotes = true
    } else if (character === ",") {
      row.push(field)
      field = ""
    } else if (character === "\n") {
      row.push(field)
      rows.push(row)
      row = []
      field = ""
    } else if (character !== "\r") {
      field += character
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows
}

function columnIndexOf(header: string[], columnName: string): number {
  const columnIndex = header.indexOf(columnName)

  if (columnIndex === -1) {
    throw new Error(`The CSV file has no "${columnName}" column`)
  }

  return columnIndex
}

function fieldAt(row: string[], columnIndex: number): string {
  const field = row[columnIndex]

  if (field === undefined) {
    throw new Error(`The CSV row has no field at index ${columnIndex}`)
  }

  return field
}

// Read as UTC, so that the day and week buckets stay identical whatever timezone the script runs in
function parseTimestamp(value: string): number {
  const match = timestampPattern.exec(value)

  if (!match) {
    throw new Error(`Unsupported timestamp format: "${value}"`)
  }

  const [, hours, minutes, year, month, day] = match

  return Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes))
}

// `Realized P&L` is taken as it stands: the column is already net of the opening, closing and
// funding fees listed next to it, so subtracting those again would count them twice
function toClosedPositions(rows: string[][]): ClosedPosition[] {
  const [header, ...dataRows] = rows

  if (!header) {
    throw new Error("The CSV file is empty")
  }

  const quantityIndex = columnIndexOf(header, "Quantity")
  const entryPriceIndex = columnIndexOf(header, "avgEntryPrice")
  const exitPriceIndex = columnIndexOf(header, "avgExitPrice")
  const pnlIndex = columnIndexOf(header, "Realized P&L")
  const closeTimeIndex = columnIndexOf(header, "Close Time")

  return dataRows
    .filter(row => row.length === header.length)
    .map(row => {
      const quantity = Number(fieldAt(row, quantityIndex))

      return {
        // Both legs are attributed to the close: that is when the P&L is realised, and positions
        // are held for minutes rather than days
        closedAt: parseTimestamp(fieldAt(row, closeTimeIndex)),
        pnl: Number(fieldAt(row, pnlIndex)),
        volume: quantity * (Number(fieldAt(row, entryPriceIndex)) + Number(fieldAt(row, exitPriceIndex)))
      }
    })
    .sort((left, right) => left.closedAt - right.closedAt)
}

function startOfUtcDay(timestamp: number): number {
  const date = new Date(timestamp)

  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

function startOfUtcWeek(timestamp: number): number {
  const dayStart = startOfUtcDay(timestamp)
  const mondayBasedWeekDay = (new Date(dayStart).getUTCDay() + daysPerWeek - 1) % daysPerWeek

  return dayStart - mondayBasedWeekDay * millisecondsPerDay
}

// `Date.UTC` rolls a day overflow into the following month, so the day is clamped first: 6 months
// before 31 August is the end of February, not 2 or 3 March
function subtractMonths(timestamp: number, months: number): number {
  const date = new Date(timestamp)
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() - months
  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()

  return Date.UTC(year, month, Math.min(date.getUTCDate(), lastDayOfMonth))
}

// The window is trimmed to its first day holding a closed position, so that a flat leading bucket
// is never plotted
function firstTradedDayFrom(positions: ClosedPosition[], windowStart: number): number {
  const firstPosition = positions.find(position => position.closedAt >= windowStart)

  return firstPosition ? Math.max(windowStart, startOfUtcDay(firstPosition.closedAt)) : windowStart
}

// Each bucket carries the net result of its own week or day, and nothing earlier: the cumulative
// curve is summed up as the points are written out, restarting from 0 at the start of the window
function toPeriodStats(
  positions: ClosedPosition[],
  windowStart: number,
  windowEnd: number,
  nextBucketStart: (timestamp: number) => number
): PeriodStats {
  const buckets: PnlBucket[] = []
  let volume = 0
  let startedAt = firstTradedDayFrom(positions, windowStart)

  while (startedAt < windowEnd) {
    const endedAt = Math.min(nextBucketStart(startedAt), windowEnd)
    const bucketPositions = positions.filter(position => position.closedAt >= startedAt && position.closedAt < endedAt)
    const pnl = bucketPositions.reduce((total, position) => total + position.pnl, 0)

    volume += bucketPositions.reduce((total, position) => total + position.volume, 0)
    buckets.push({ startedAt, endedAt, pnl })
    startedAt = endedAt
  }

  return { buckets, volume }
}

function formatDay(timestamp: number): string {
  const date = new Date(timestamp)

  return `${date.getUTCDate()} ${monthFormatter.format(date).toLowerCase()}`
}

// "12 aug" for a single day, "7-13 sep" for a week within one month, "31 aug - 6 sep" for a week
// spanning two
function formatBucketLabel(bucket: PnlBucket): string {
  const firstDay = new Date(startOfUtcDay(bucket.startedAt))
  const lastDay = new Date(startOfUtcDay(bucket.endedAt - 1))

  if (firstDay.getTime() === lastDay.getTime()) {
    return formatDay(firstDay.getTime())
  }

  if (firstDay.getUTCMonth() === lastDay.getUTCMonth()) {
    return `${firstDay.getUTCDate()}-${lastDay.getUTCDate()} ${monthFormatter.format(lastDay).toLowerCase()}`
  }

  return `${formatDay(firstDay.getTime())} - ${formatDay(lastDay.getTime())}`
}

function toIsoDate(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10)
}

// The running total is summed from the unrounded bucket results and only rounded once it is
// written out: rounding every bucket first, then summing, drifts away from the net result of the
// underlying positions by a dollar or so
function toPnlPointLines(stats: PeriodStats): string[] {
  let cumulativePnl = 0

  return stats.buckets.map((bucket, index) => {
    cumulativePnl += bucket.pnl

    const point = `{ date: "${toIsoDate(bucket.startedAt)}", label: "${formatBucketLabel(bucket)}", `
      + `pnl: ${Math.round(bucket.pnl)}, cumulativePnl: ${Math.round(cumulativePnl)} }`
    const separator = index < stats.buckets.length - 1 ? "," : ""

    return `  ${point}${separator}`
  })
}

function toGeneratedFileContent(
  csvFileName: string,
  statsAsOf: number,
  longPeriodStats: PeriodStats,
  shortPeriodStats: PeriodStats
): string {
  return [
    `// Generated by \`npm run generate-stats\` from \`${csvFileName}\`.`,
    "// Do not edit by hand: drop the new export in `src/Data/`, then run the script again.",
    "",
    "// `pnl` is the net result of that week or day alone, `cumulativePnl` the running total since",
    "// the start of the window. Both in whole dollars",
    "export type PnlPoint = {",
    "  date: string;",
    "  label: string;",
    "  pnl: number;",
    "  cumulativePnl: number;",
    "}",
    "",
    "// The last day covered by the source export",
    `export const statsAsOf = "${toIsoDate(statsAsOf)}"`,
    "",
    `export const vol6months = ${Math.round(longPeriodStats.volume)}`,
    "",
    "export const pnlStats6months: PnlPoint[] = [",
    ...toPnlPointLines(longPeriodStats),
    "]",
    "",
    `export const vol30days = ${Math.round(shortPeriodStats.volume)}`,
    "",
    "export const pnlStats30days: PnlPoint[] = [",
    ...toPnlPointLines(shortPeriodStats),
    "]",
    ""
  ].join("\n")
}

export function generateStats(): void {
  const csvFilePath = firstCsvFilePath()
  const positions = toClosedPositions(parseCsv(readFileSync(csvFilePath, "utf8")))
  const lastPosition = positions.at(-1)

  if (!lastPosition) {
    throw new Error(`No closed position was found in "${csvFilePath}"`)
  }

  // "Now" is the end of the last day covered by the export
  const anchor = startOfUtcDay(lastPosition.closedAt) + millisecondsPerDay

  const longPeriodStats = toPeriodStats(
    positions,
    subtractMonths(anchor, longPeriodMonths),
    anchor,
    timestamp => startOfUtcWeek(timestamp) + daysPerWeek * millisecondsPerDay
  )

  const shortPeriodStats = toPeriodStats(
    positions,
    anchor - shortPeriodDays * millisecondsPerDay,
    anchor,
    timestamp => startOfUtcDay(timestamp) + millisecondsPerDay
  )

  const csvFileName = csvFilePath.slice(dataDirectoryPath.length + 1)

  writeFileSync(
    join(dataDirectoryPath, generatedFileName),
    toGeneratedFileContent(csvFileName, lastPosition.closedAt, longPeriodStats, shortPeriodStats),
    "utf8"
  )

  console.log(`${generatedFileName} written from ${csvFileName}: ${positions.length} closed positions, `
    + `${longPeriodStats.buckets.length} weekly and ${shortPeriodStats.buckets.length} daily data points.`)
}

generateStats()
