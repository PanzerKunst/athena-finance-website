import {faBars} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import {useEffect, useRef, useState} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"

import {ScrollToHeaderButton} from "./ScrollToHeaderButton.tsx"
import {useAppContext} from "../../../AppContext.tsx"
import {scrollToElement, useViewportSize} from "../../../Util/BrowserUtils.ts"
import {Menu} from "../Menu.tsx"
import {AnimatedBrandName} from "./AnimatedBrandName.tsx"

import s from "/src/UI/_CommonStyles/_exports.module.scss"
import "./AppHeader.scss"

const headerHeight = parseInt(s.headerHeight!)
let lastScrollY = window.scrollY

export function AppHeader() {
  const appContext = useAppContext()
  const {headerTitle} = appContext

  const navigate = useNavigate()
  const location = useLocation()

  const viewportWidth = useViewportSize().width
  const viewportWidthLg = parseInt(s.vwLg || "")
  const isMobile = viewportWidth < viewportWidthLg

  const isLandingPage = location.pathname === "/"

  const headerRef = useRef<HTMLHeadingElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const header = headerRef.current

    if (!header) {
      return
    }

    function handleScroll() {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY
      const headerTopPos = parseInt(header!.style.top)

      // Header always shown when scrolled near the top
      let newTopPos = 0

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) { // Scrolling down
          const isHeaderFullyHidden = headerTopPos === -headerHeight

          newTopPos = isHeaderFullyHidden
            ? -headerHeight
            : Math.max(headerTopPos - delta, -headerHeight)

        } else { // Scrolling up
          const isHeaderFullyVisible = headerTopPos === 0

          newTopPos = isHeaderFullyVisible
            ? 0
            : Math.min(headerTopPos - delta, 0)
        }
      }

      header!.style.top = `${newTopPos}px`

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, {passive: true})

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToHeaderBeforeScrolling = () => {
    if (!isLandingPage) {
      navigate("/")
    }
  }

  const handleMenuItemClick = (cssSelector: string) => {
    setIsMenuOpen(false)

    if (isLandingPage) {
      scrollToElement(cssSelector)
    } else {
      navigate("/")

      setTimeout(() => {
        scrollToElement(cssSelector)
      }, 100)
    }
  }

  return (
    <div className="app-header-wrapper">
      <header
        ref={headerRef}
        className={classNames({mobile: isMobile, "menu-open": isMenuOpen})}
        style={{top: 0}}
      >
        <Link to="/">
          <img src="/images/vite.svg" alt="logo"/>
          <AnimatedBrandName/>
        </Link>

        {headerTitle && <h2>{headerTitle}</h2>}

        {isMobile ? (
          <button className="button icon-only" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FontAwesomeIcon icon={faBars}/>
          </button>
        ) : (
          <nav>
            <ScrollToHeaderButton label="Risks" scrollToCssSelector="#risks" beforeScrolling={handleScrollToHeaderBeforeScrolling}/>
            <ScrollToHeaderButton label="Policies" scrollToCssSelector="#policies" beforeScrolling={handleScrollToHeaderBeforeScrolling}/>
            <ScrollToHeaderButton label="Vendors" scrollToCssSelector="#vendors" beforeScrolling={handleScrollToHeaderBeforeScrolling}/>
            <ScrollToHeaderButton label="Pricing" scrollToCssSelector="#pricing" beforeScrolling={handleScrollToHeaderBeforeScrolling}/>
            <button className="underlined appears" onClick={() => navigate("/consulting")}>Consulting</button>
            <button className="underlined appears" onClick={() => navigate("/contact")}>Contact</button>
          </nav>
        )}
      </header>

      {isMenuOpen && ( /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-to-interactive-role */
        <Menu close={() => setIsMenuOpen(false)}>
          <li role="button" onClick={() => handleMenuItemClick("#risks")}>
            <span>Risks</span>
          </li>
          <li role="button" onClick={() => handleMenuItemClick("#policies")}>
            <span>Policies</span>
          </li>
          <li role="button" onClick={() => handleMenuItemClick("#vendors")}>
            <span>Vendors</span>
          </li>
          <li role="button" onClick={() => handleMenuItemClick("#pricing")}>
            <span>Pricing</span>
          </li>
          <li role="link" onClick={() => {
            navigate("/consulting")
            setIsMenuOpen(false)
          }}>
            <span>Consulting</span>
          </li>
          <li role="link" onClick={() => {
            navigate("/contact")
            setIsMenuOpen(false)
          }}>
            <span>Contact</span>
          </li>
        </Menu>
        /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-to-interactive-role */
      )}
    </div>
  )
}
