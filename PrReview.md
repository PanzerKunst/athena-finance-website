# The review comments

In src/UI/LandingPage/PerformanceStats.tsx, about:
```
  let cumulativePnl = 0

  return pnlPoints.map(point => {
    cumulativePnl += point.pnl
```
Comment:
`point.pnl` has already been rounded per bucket by the generator, so summing those integers accumulates rounding error and can make both the cumulative chart and headline differ from the rounded net P&L of the underlying positions. Keep the rounded per-bucket value for the tooltip, but generate cumulative values (or a final total) from the unrounded bucket totals before rounding and render those instead.
