import { Burger, Drawer } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"

import "./AppHeader.scss"

// Above the fold the header always stays visible: the top of the page is never obscured
const alwaysVisibleScrollY = 100

type SectionLink = {
  label: string;
  href: string;
}

const sectionLinks: SectionLink[] = [
  { label: "How we work", href: "#how-we-work" },
  { label: "Performance", href: "#performance" }
]

export function AppHeader() {
  const [isHidden, setIsHidden] = useState(false)
  const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] = useDisclosure(false)

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
          <Link to="/" className="brand">Athena Finance</Link>

          <nav>
            {sectionLinks.map(sectionLink => (
              <a key={sectionLink.href} href={sectionLink.href}>{sectionLink.label}</a>
            ))}
          </nav>

          <Burger
            opened={isDrawerOpen}
            onClick={openDrawer}
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
        title="Athena Finance"
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
