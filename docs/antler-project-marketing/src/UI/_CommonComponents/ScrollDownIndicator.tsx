import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"

import { scrollIntoView } from "../../Util/BrowserUtils.ts"

import s from "/src/UI/_CommonStyles/_exports.module.scss"
import "./ScrollDownIndicator.scss"

const motionVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, 10, 0], // Move the icon down by 10px and back to its original position
    transition: {
      duration: s.animationDurationSm,
      ease: "easeInOut",
      times: [0, 0.5, 1], // Keyframes for the animation
      delay: 0.9
    },
  }
}

type Props = {
  targetCssSelector: string;
}

export function ScrollDownIndicator({ targetCssSelector }: Props) {
  const handleClick = () => {
    const scrollToElement = document.querySelector(targetCssSelector)
    scrollIntoView(scrollToElement)
  }

  return (
    <motion.div
      className="scroll-down-indicator"
      variants={motionVariants}
      initial="initial"
      animate="animate"
    >
      <button className="button icon-only" onClick={handleClick}>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </motion.div>
  )
}
