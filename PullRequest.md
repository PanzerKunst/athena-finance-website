# Guidelines

Leverage the `frontend-design` plugin if available.

TypeScript:
- Whenever possible, `null` should be avoided, using `undefined` instead, including for React components' return value.
- Declare TypeScript types, not interfaces.
- Leverage code existing in `src/Util` when possible.

SCSS: as a general rule, leverage the cascade to mirror the HTML markup as much as possible. More specifically:
- If an element is a direct child, be specific and include `>`
- Nest elements by default, until it reaches the `max-nesting-depth` Stylelint limit

Following a Pull Request implementation, run the "lint" script declared in package.json.

# The task to work on

## Step 1 (done)

The performance section of the landing page currently has hard-coded data. This was a first draft, and we want to replace it by real statistics (data and graphs). We'll add the `Recharts` library for that.

We want to display PnL over 2 periods: last 6 months, and last 30 days. We also want to display total volume traded over each period.

### Data preparation

The data source is the CSV file located in `src\Data\`. From that CSV, cumulative net PnL and volume for the statistics need to be calculated. Volume = open + close volume.
Since these values need to be recalculated only when the CSV is changed, let's do it "offline", by running a script declared in package.json. That script runs function `generateStats`, itself declared in `src/Data/StatsGenerator.ts`. Function `generateStats` re-generates `src/Data/GeneratedStats.ts`, which will contain variables needed by `LandingPage.tsx` to display the statistics. Example variable names: `pnlStats30days`, `pnlStats6months`, `vol30days` and `vol6months`. PnL should be net of fees (trading/funding).
The name of the CSV file will change over time, but there will be only 1 file in that folder. So `generateStats` should simply consider the first `.csv` file found there.

Clarifications:
- What is "now" -> The anchor is the end of the CSV's last day. Related: the section copy says "as of 31 August 2026". That data point should be taken from `GeneratedStats.ts` (either dedicated variable, or deducted from the other ones.
- "Last 6 months" -> The whole span of the CSV history in practice - around 184 days.
- A Node script inside `src/` -> Acceptable.

### Statistics UI

The 4 stats generated in `src/Data/GeneratedStats.ts` will be displayed over 2 tabbed panels. Each panel shows:
- Top section on the left: Trading volume over the window
- Top section, on the right: Cumulative PnL reached at the end of the window
- Bottom section: line chart showing the cumulative PnL over time, within the window. X axis = time, Y axis = PnL in dollars.

About the PnL chart:
- Last 6 months: 1 data point per week. The last incomplete week is considered a data point, and should be shown. In case the stats start after a monday, that first incomplete week is also considered a data point.
- Last 30 days: 1 data point per day. The last incomplete day is considered a data point, and should be shown.

One volume & PnL stat is displayed at a time, with the possibility to switch via tabs. The first (default) tab shows the 6 months stats.

Chart interactivity: Either triggered by touching the chart area (on touch screen), or hovering the chart area (if using a mouse). In that situation, the PnL value for the data point touched/hovered is displayed, as well as the "time" value for that week/day.

The format of "time" depends on the chart's period:
- 6 months: a label identifying the week. For example "X-Y mmm" (ex: "7-13 sep") if within one month, or "X mmm - Y mmm" (ex: "31 aug - 6 sep") if spanning 2 months.
- 30 days: a label identifying the day, format "X mmm".

Or feel free to suggest a better UX for displaying details for a data point.

React components: let's write the statistics (the 2 tabbed panels) in its own component, created in `UI/LandingPage`: `PerformanceStats.tsx` + `PerformanceStats.scss`.

If Recharts needs to consume colour values, take inspiration from the system in `docs/antler-project-marketing/src/UI/_CommonStyles/_exports.module.scss`.

## Step 2 (done)

I'd like the Statistics UI changed:
- The graph line smoothed
- Keep a light background (white or `$color-offset-bg`), not the current black background. Note that with the new background. the current `$color-panel-positive` becomes too bright.
- On hover/touch of a data point, the PnL value to display would be PnL for that data point, not the cumulative PnL until that point. `$color-negative` should be added for points with negative PnL, a restrained red.

Context clarifications:
- The tooltip value will no longer match the point it is attached to, and this is considered acceptable.
- .figure.net-result (PerformanceStats.scss:68) is currently hard-coded to the positive colour. We need the colour to be conditional to the positivity of the PnL.


Changes to `StatsGenerator.ts`:
- `pnl` will hold per-bucket value, not cumulative. I leave it up to you to decide to add a field for cumulative PnL, or to have it calculated at runtime.
- The `pnl` field of `PnlPoint` should be integer, rounded to nearest integer.

## Step 3

An override of Mantine styling. Right now on the performance panel, the 2px line at the bottom of Mantine tabs acts as the panel's top border. But they are of different colour. I would like Mantine tabs to be overriden, app-wide, so that the bottom line takes colour `$color-border`. No change in the line's thickness.