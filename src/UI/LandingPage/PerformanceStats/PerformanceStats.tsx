import { Tabs } from "@mantine/core"
import { useReducedMotion } from "@mantine/hooks"
import classNames from "classnames"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { netResultClassName, pnlFormatter } from "./NetResult.ts"
import { PnlPerPair } from "./PnlPerPair.tsx"
import {
  type PairPnl,
  type PnlPoint,
  pnlPerPair30days,
  pnlPerPair6months,
  pnlStats30days,
  pnlStats6months,
  vol30days,
  vol6months
} from "../../../Data/GeneratedStats.ts"
import styleExports from "../../_CommonStyles/_exports.module.scss"

import "./PerformanceStats.scss"

type PerformancePeriod = {
  key: string;
  tabLabel: string;
  chartDescription: string;
  volume: number;
  chartPoints: PnlPoint[];
  pairPnls: PairPnl[];
}

// The 6-month period comes first, so that it is the one shown by default
const performancePeriods: PerformancePeriod[] = [
  {
    key: "6-months",
    tabLabel: "Last 6 months",
    chartDescription: "Cumulative profit and loss, week by week, over the last 6 months",
    volume: vol6months,
    chartPoints: pnlStats6months,
    pairPnls: pnlPerPair6months
  },
  {
    key: "30-days",
    tabLabel: "Last 30 days",
    chartDescription: "Cumulative profit and loss, day by day, over the last 30 days",
    volume: vol30days,
    chartPoints: pnlStats30days,
    pairPnls: pnlPerPair30days
  }
]

const volumeFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
})

// "$24K" rather than "$24,000": the axis only has to give the reader an order of magnitude
const axisPnlFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1
})

const tabsClassNames = {
  root: "performance-stats",
  list: "period-tabs",
  tab: "period-tab",
  panel: "period-panel"
}

const chartMargin = { top: 8, right: 8, bottom: 0, left: 0 }
const axisTick = { fill: styleExports.colorLabel }
const chartCursor = { stroke: styleExports.colorChartCursor, strokeWidth: 1 }

const activeDot = {
  r: 4,
  fill: styleExports.colorPositive,
  stroke: styleExports.colorOffsetBg,
  strokeWidth: 2
}

// Recharts clones this element with the hovered, touched or arrowed-to point, hence the optional
// props: nothing is passed while the pointer is away from the plot area
type ChartTooltipProps = {
  active?: boolean;
  payload?: { payload: PnlPoint }[];
}

// The point's own result is shown rather than the curve's height at that point: how a single week
// or day went is what the reader cannot otherwise read off the chart
function ChartTooltip({ active, payload }: ChartTooltipProps) {
  const point = payload?.[0]?.payload

  if (!active || !point) {
    return undefined
  }

  return (
    <div className="chart-tooltip">
      <span className="label">{point.label}</span>
      <span className={netResultClassName(point.pnl)}>{pnlFormatter.format(point.pnl)}</span>
    </div>
  )
}

// Annotated rather than inlined: Recharts hands its formatters an `any`
function formatAxisPnl(value: number): string {
  return axisPnlFormatter.format(value)
}

function netResultOf(chartPoints: PnlPoint[]): number {
  return chartPoints.at(-1)?.cumulativePnl ?? 0
}

export function PerformanceStats() {
  // Recharts draws its reveal in JavaScript, out of reach of a `prefers-reduced-motion` media query
  const prefersReducedMotion = useReducedMotion()

  return (
    // `keepMounted` off so that the chart is measured when its panel is visible: a chart mounted
    // inside a hidden panel has no width to lay itself out in
    <Tabs
      defaultValue={performancePeriods[0]?.key}
      classNames={tabsClassNames}
      keepMounted={false}
    >
      <Tabs.List>
        {performancePeriods.map(period => (
          <Tabs.Tab key={period.key} value={period.key}>{period.tabLabel}</Tabs.Tab>
        ))}
      </Tabs.List>

      {performancePeriods.map(period => {
        const netResult = netResultOf(period.chartPoints)

        return (
          <Tabs.Panel key={period.key} value={period.key}>
            <div>
              <div className="figures">
                <div>
                  <span className="label">Trading volume</span>
                  <span className="figure">{volumeFormatter.format(period.volume)}</span>
                </div>

                <div>
                  <span className="label">Cumulative P&L</span>
                  <span className={classNames("figure", netResultClassName(netResult))}>{pnlFormatter.format(netResult)}</span>
                </div>
              </div>

              <div className="chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={period.chartPoints}
                    margin={chartMargin}
                    accessibilityLayer
                    aria-label={period.chartDescription}
                  >
                    <CartesianGrid vertical={false} stroke={styleExports.colorChartGrid}/>
                    <XAxis
                      dataKey="label"
                      tick={axisTick}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={32}
                    />
                    <YAxis
                      tickFormatter={formatAxisPnl}
                      tick={axisTick}
                      tickLine={false}
                      axisLine={false}
                      width={56}
                    />
                    <Tooltip content={<ChartTooltip/>} cursor={chartCursor}/>
                    <Line
                      type="monotone"
                      dataKey="cumulativePnl"
                      stroke={styleExports.colorPositive}
                      strokeWidth={2}
                      dot={false}
                      activeDot={activeDot}
                      isAnimationActive={!prefersReducedMotion}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <PnlPerPair pairPnls={period.pairPnls}/>

            <p className="caption">All figures in USD, net of trading and funding fees.</p>
          </Tabs.Panel>
        )
      })}
    </Tabs>
  )
}
