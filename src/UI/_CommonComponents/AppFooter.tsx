import AthenaIcon from "./svg/athena.svg?react"

import "./AppFooter.scss"

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="container">
        <div>
          <span className="brand">
            <AthenaIcon aria-hidden/>
            Athena Finance
          </span>
        </div>

        <div>
          <span className="company">8b Services AB</span>
          <span>Stockholm, Sweden</span>
        </div>
      </div>
    </footer>
  )
}
