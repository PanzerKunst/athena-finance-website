import AthenaIcon from "./svg/athena.svg?react"

import "./BrandAndName.scss"

export function BrandAndName() {
  return (
    <div className="brand-and-name">
      <AthenaIcon aria-hidden/>
      <span>Athena Finance</span>
    </div>
  )
}
