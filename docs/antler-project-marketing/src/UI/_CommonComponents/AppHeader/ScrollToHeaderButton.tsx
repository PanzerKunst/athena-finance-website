import {scrollToElement} from "../../../Util/BrowserUtils.ts"

type Props = {
  label: string;
  scrollToCssSelector: string;
  beforeScrolling?: () => void;
}

export function ScrollToHeaderButton({ label, scrollToCssSelector, beforeScrolling }: Props) {
  const handleClick = () => {
    if (!beforeScrolling) {
      scrollToElement(scrollToCssSelector)
    } else {
      beforeScrolling()

      setTimeout(() => {
        scrollToElement(scrollToCssSelector)
      }, 100)
    }
  }

  return (
    <button className="underlined appears" onClick={handleClick}>{label}</button>
  )
}
