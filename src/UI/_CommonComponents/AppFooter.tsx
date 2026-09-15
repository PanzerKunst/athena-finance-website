import { BrandAndName } from "./BrandAndName.tsx"

import "./AppFooter.scss"

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="container">
        <BrandAndName />

        <div>
          <span className="company">8b Services AB</span>
          <span>Stockholm, Sweden</span>
        </div>
      </div>
    </footer>
  )
}
