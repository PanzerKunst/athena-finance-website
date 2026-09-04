import {easeOut, motion} from "framer-motion"

import s from "/src/UI/_CommonStyles/_exports.module.scss"
import "./AnimatedBrandName.scss"

const transition = {duration: 0.5, ease: easeOut, delay: 0.5}

const letterCvariants = {
  initial: {marginLeft: 0},
  animate: {marginLeft: "0.68em", transition}
}

const addedLetterVariants = {
  initial: {opacity: 0},
  animate: {
    opacity: 1,
    transition: {
      duration: s.animationDurationLg,
      delay: transition.delay + transition.duration
    }
  }
}

export function AnimatedBrandName() {
  return (
    <motion.span className="animated-brand-name" initial="initial" animate="animate">
      <motion.span>G</motion.span>
      <motion.span>R</motion.span>
      <motion.span className="added-letter a" variants={addedLetterVariants}>A</motion.span>
      <motion.span variants={letterCvariants}>C</motion.span>
      <motion.span className="added-letter e" variants={addedLetterVariants}>E</motion.span>
    </motion.span>
  )
}
