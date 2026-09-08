import { Burger, Drawer } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"

import AthenaIcon from "../svg/athena.svg?react"

import "./AppHeader.scss"

// Above the fold the header always stays visible: the top of the page is never obscured
const alwaysVisibleScrollY = 100

type SectionLink = {
  label: string;
  href: string;
}

const sectionLinks: SectionLink[] = [
  { label: "Our process", href: "#process" },
  { label: "Results", href: "#results" }
]

export function AppHeader() {
  const [isHidden, setIsHidden] = useState(false)
  const [isDrawerOpen, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)

  // A ref rather than a module-level variable, so the value cannot outlive the component
  const lastScrollYRef = useRef(window.scrollY)

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollYRef.current

      setIsHidden(isScrollingDown && currentScrollY > alwaysVisibleScrollY)

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="app-header-wrapper">
      <header className={classNames({ hidden: isHidden })}>
        <div className="container">
          <Link to="/" className="brand">
            <AthenaIcon aria-hidden/>
            Athena Finance
          </Link>

          <nav>
            {sectionLinks.map(sectionLink => (
              <a key={sectionLink.href} href={sectionLink.href} className="underlined appears">{sectionLink.label}</a>
            ))}
          </nav>

          {/*
            The label stays "Open" in both states on purpose: the Drawer's overlay covers the
            Burger as soon as it opens, so the only action ever offered to the user is "open".
          */}
          <Burger
            opened={isDrawerOpen}
            onClick={toggleDrawer}
            size="sm"
            aria-label="Open the navigation menu"
          />
        </div>
      </header>

      <Drawer
        opened={isDrawerOpen}
        onClose={closeDrawer}
        position="right"
        size="80%"
        title={<><AthenaIcon aria-hidden/>Athena Finance</>}
        classNames={{ root: "app-header-drawer" }}
      >
        <nav>
          {sectionLinks.map(sectionLink => (
            <a key={sectionLink.href} href={sectionLink.href} onClick={closeDrawer}>{sectionLink.label}</a>
          ))}
        </nav>
      </Drawer>
    </div>
  )
}
