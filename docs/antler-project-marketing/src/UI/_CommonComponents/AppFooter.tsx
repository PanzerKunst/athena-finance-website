import dayjs from "dayjs"
import { Link } from "react-router-dom"

import { SubscribeToMailingListForm } from "./SubscribeToMailingListForm.tsx"

import "./AppFooter.scss"

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="container">
        <div>
          <div>
            <h3>Get notified when we launch</h3>
            <SubscribeToMailingListForm/>
          </div>
          <p>Stay up to date with the latest news, announcements, and articles.</p>
        </div>

        <div>
          <nav>
            <ul className="styleless">
              <li>
                <Link to="/consulting" className="underlined appears">Consulting</Link>
              </li>
              <li>
                <Link to="/survey" className="underlined appears">Survey</Link>
              </li>
              <li>
                <Link to="/contact" className="underlined appears">Contact</Link>
              </li>
            </ul>
          </nav>

          <div>
            <span>&copy; {dayjs().year()} GRACE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
