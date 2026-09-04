import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode, useState } from "react"

import { FadeIn } from "./FadeIn.tsx"

import "./Banner.scss"

type Props = {
  children: ReactNode;
}

export function Banner({ children }: Props) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return undefined
  }

  return (
    <FadeIn className="banner">
      <div className="placeholder"/>
      <div className="children">
        {children}
      </div>
      <button className="button icon-only light" onClick={() => setIsVisible(false)}>
        <FontAwesomeIcon icon={faXmark}/>
      </button>
    </FadeIn>
  )
}
