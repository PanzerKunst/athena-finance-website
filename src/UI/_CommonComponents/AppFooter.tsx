import "./AppFooter.scss"

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="container">
        <div>
          <span className="brand">Athena Finance</span>
          <a href="https://athenafinance.tech" className="underlined-on-hover">athenafinance.tech</a>
        </div>

        <div>
          <span className="company">8b Services AB</span>
          <span>Stockholm, Sweden</span>
        </div>
      </div>
    </footer>
  )
}
