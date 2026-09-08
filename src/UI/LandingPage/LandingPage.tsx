import { PulseIcon } from "@phosphor-icons/react"

import { PerformanceStats } from "./PerformanceStats.tsx"
import { statsAsOf } from "../../Data/GeneratedStats.ts"
import RustIcon from "../_CommonComponents/svg/rust.svg?react"

import "./LandingPage.scss"

const asOfFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC"
})

export function LandingPage() {
  return (
    <div className="page landing">
      <main>
        <section id="hero">
          <div className="container">
            <h1>Systematic liquidity for perpetual futures</h1>
            <p className="lead">
              Athena Finance develops and operates automated, data-driven strategies across leading cryptocurrency exchanges. By executing
              strictly via limit orders, our strategies actively provide liquidity to the market.
            </p>
          </div>
        </section>

        <section id="process">
          <div className="container">
            <p className="label">Our process</p>
            <h2>Data-driven research <span className="separator">/</span> High-performance execution</h2>
            <p className="lead">We focus on mid- and high-frequency trades where research discipline and systems reliability are inseparable.</p>

            <ul className="styleless">
              <li>
                <PulseIcon size={28} aria-hidden/>
                <h3>01 <span className="separator">/</span> Strategy research</h3>
                <p>Ideas are expressed in Pine Script, evaluated across market regimes, and refined through exhaustive backtesting in TradingView.</p>
              </li>
              <li>
                <RustIcon width={28} height={28} aria-hidden/>
                <h3>02 <span className="separator">/</span> High-performance engine</h3>
                <p>Validated logic is translated into a proprietary execution engine designed for low-latency trading, written in Rust.</p>
              </li>
            </ul>
          </div>
        </section>

        <section id="results">
          <div className="container">
            <p className="label">Results</p>
            <h2>Operating results across recent periods</h2>
            <p className="muted">
              Results are shown from the current account record as of {asOfFormatter.format(new Date(statsAsOf))}. Historical performance is not
              indicative of future results.
            </p>
            <PerformanceStats/>
          </div>
        </section>
      </main>
    </div>
  )
}
