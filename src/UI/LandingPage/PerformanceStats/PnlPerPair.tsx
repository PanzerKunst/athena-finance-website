import { type CSSProperties } from "react"

import { netResultClassName, pnlFormatter } from "./NetResult.ts"
import { type PairPnl } from "../../../Data/GeneratedStats.ts"

import "./PnlPerPair.scss"

type PnlPerPairProps = {
  pairPnls: PairPnl[];
}

// Never 0: it divides the bar widths, and a period where every pair broke exactly even would
// otherwise leave every one of them `NaN`
function largestAbsolutePnlOf(pairPnls: PairPnl[]): number {
  return Math.max(...pairPnls.map(pairPnl => Math.abs(pairPnl.pnl)), 1)
}

// A share of the largest result of the ten, whichever side of zero that one happens to fall on
function barStyle(pnl: number, largestAbsolutePnl: number): CSSProperties {
  return { width: `${(Math.abs(pnl) / largestAbsolutePnl) * 100}%` }
}

// The bar only restates the amount printed next to it, hence `aria-hidden`: a screen reader is
// read the pair and its result, and spared a decoration it cannot convey
export function PnlPerPair({ pairPnls }: PnlPerPairProps) {
  const largestAbsolutePnl = largestAbsolutePnlOf(pairPnls)

  return (
    <div className="pnl-per-pair">
      <p className="label">P&L per contract</p>

      <ul className="styleless">
        {pairPnls.map(pairPnl => (
          <li key={pairPnl.pair} className={netResultClassName(pairPnl.pnl)}>
            <span className="pair">{pairPnl.pair}</span>
            <span className="bar" style={barStyle(pairPnl.pnl, largestAbsolutePnl)} aria-hidden/>
            <span className="pnl">{pnlFormatter.format(pairPnl.pnl)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
