import { ReactElement } from "react"

import "./IconWithDualBgColor.scss"

type Props = {
  children: ReactElement; // Expecting a single element
}

export function IconWithDualBgColor({ children }: Props) {
  return (
    <div className="icon-with-dual-bg-color">
      <div>
        {children}
      </div>
    </div>
  )
}
