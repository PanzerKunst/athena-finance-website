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

// Every contract on the book is quoted in USDT, so the suffix repeats itself down the column and
// tells the reader nothing. Guarded rather than a blind slice, so a contract quoted in anything
// else would still print in full
const quoteCurrency = "USDT"

function baseAssetOf(pair: string): string {
  return pair.endsWith(quoteCurrency) ? pair.slice(0, -quoteCurrency.length) : pair
}

// A share of the largest result of the ten, whichever side of zero that one happens to fall on
function barStyle(pnl: number, largestAbsolutePnl: number): CSSProperties {
  return { width: `${(Math.abs(pnl) / largestAbsolutePnl) * 100}%` }
}

// The bar only restates the amount printed next to it, hence `aria-hidden`: a screen reader reads
// out the pair and its result, and skips a decoration it cannot convey
export function PnlPerPair({ pairPnls }: PnlPerPairProps) {
  const largestAbsolutePnl = largestAbsolutePnlOf(pairPnls)

  return (
    <div className="pnl-per-pair">
      <p className="label">P&L per coin</p>

      <ul className="styleless">
        {pairPnls.map(pairPnl => (
          <li key={pairPnl.pair} className={netResultClassName(pairPnl.pnl)}>
            <span className="pair">{baseAssetOf(pairPnl.pair)}</span>
            <span className="bar" style={barStyle(pairPnl.pnl, largestAbsolutePnl)} aria-hidden/>
            <span className="pnl">{pnlFormatter.format(pairPnl.pnl)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
