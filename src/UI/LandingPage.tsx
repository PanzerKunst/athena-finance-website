import { PulseIcon } from "@phosphor-icons/react"

import RustIcon from "./_CommonComponents/rust.svg?react"

import "./LandingPage.scss"

type PerformanceStat = {
  period: string;
  netResult: string;
  tradingVolume: string;
}

const performanceStats: PerformanceStat[] = [
  { period: "Last 30 days", netResult: "+$9,673 USD", tradingVolume: "$12,676,262" },
  { period: "Last 180 days", netResult: "+$22,572 USD", tradingVolume: "$56,814,240" }
]

// Relative heights, in percent, of the cumulative curve as summarised in the mockup
const cumulativePnlBarHeights = [10, 13, 53, 63, 75, 100]

export function LandingPage() {
  return (
    <div className="page landing">
      <main>
        <section id="hero">
          <div className="container">
            <h1>Systematic trading for perpetual futures</h1>
            <p className="lead">
              Athena Finance develops and operates automated, data-driven strategies across cryptocurrency derivatives markets. We focus on mid- and
              high-frequency execution where research discipline and systems reliability are inseparable.
            </p>
          </div>
        </section>

        <section id="how-we-work">
          <div className="container">
            <p className="label">01 <span className="separator">/</span> How we work</p>
            <h2>Data-driven research / High-performance execution</h2>

            <ul className="styleless">
              <li>
                <PulseIcon size={28}/>
                <h3>01 <span className="separator">/</span> Strategy research</h3>
                <p>Ideas are expressed in Pine Script, evaluated across market regimes, and refined through exhaustive TradingView backtesting.</p>
              </li>
              <li>
                <RustIcon width={28} height={28}/>
                <h3>02 <span className="separator">/</span> High-performance engine</h3>
                <p>Validated logic is translated into a proprietary Rust execution engine designed for low-latency trading.</p>
              </li>
            </ul>
          </div>
        </section>

        <section id="performance">
          <div className="container">
            <p className="label">02 <span className="separator">/</span> Performance</p>
            <h2>Operating results across recent periods</h2>
            <p className="muted">
              Results are shown from the current account record as of 31 August 2026. Historical performance is not indicative of future results.
            </p>

            <ul className="styleless">
              {performanceStats.map(({ period, netResult, tradingVolume }) => (
                <li key={period}>
                  <span className="label">{period}</span>
                  <span className="net-result">{netResult}</span>
                  <span className="trading-volume">Trading volume <span className="separator">/</span> {tradingVolume}</span>
                </li>
              ))}
            </ul>

            <div className="pnl-panel">
              <header>
                <span className="label">Cumulative P&L <span className="separator">/</span> 180 days</span>
                <span className="net-result">+$22,572</span>
              </header>

              <div
                className="bars"
                role="img"
                aria-label="Bar chart of the cumulative profit and loss over the last 180 days, rising steadily from left to right"
              >
                {cumulativePnlBarHeights.map(barHeight => (
                  <div key={barHeight} style={{ height: `${barHeight}%` }}/>
                ))}
              </div>

              <p className="caption">A native summary of the cumulative curve shown in the 180-day account record.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
