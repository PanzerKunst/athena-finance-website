import {faCircleCheck, faCirclePlay} from "@fortawesome/free-regular-svg-icons"
import {
  faArrowRightArrowLeft,
  faBell,
  faCheck,
  faCircleNodes,
  faClockRotateLeft,
  faFileSignature,
  faFileWord,
  faScaleBalanced,
  faSitemap,
  faSquareCheck,
  faStamp,
  faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useState} from "react"
import {Link} from "react-router-dom"

import {AnalyticsEvent, triggerAnalyticsEvent} from "../Util/AnalyticsUtils.ts"
import {FadeIn} from "./_CommonComponents/FadeIn.tsx"
import {IconWithDualBgColor} from "./_CommonComponents/IconWithDualBgColor.tsx"
import {SubscribeToMailingListForm} from "./_CommonComponents/SubscribeToMailingListForm.tsx"
import {VideoPlayer} from "./_CommonComponents/VideoPlayer.tsx"

import s from "/src/UI/_CommonStyles/_exports.module.scss"
import "./LandingPage.scss"

export function LandingPage() {
  const [playRiskModuleVideo, setPlayRiskModuleVideo] = useState(false)
  const [playPolicyModuleVideo, setPlayPolicyModuleVideo] = useState(false)

  const handlePlayRiskModuleVideo = () => {
    setPlayRiskModuleVideo(true)
  }

  const handlePlayPolicyModuleVideo = () => {
    setPlayPolicyModuleVideo(true)
  }

  return (
    <div className="page landing">
      <main>
        <section id="hero" className="text-block-and-img">
          <div>
            <FadeIn duration={s.animationDurationMd}>
              <h1>Solve your Risk, Vendor and Policy issues</h1>
            </FadeIn>

            <FadeIn delay={0.4} duration={s.animationDurationMd}>
              <p>Bite-sized solutions for every GRC issue working together and allowing you to grow and adapt.</p>
              <SubscribeToMailingListForm/>
            </FadeIn>
          </div>
          <img src="/images/landing/hero-mobile.png" alt="GRC app" className="mobile"/>
          <img src="/images/landing/hero-desktop.png" alt="GRC app" className="desktop"/>
        </section>

        <section id="risks" className="product-module">
          <div>
            <IconWithDualBgColor>
              <FontAwesomeIcon icon={faTriangleExclamation}/>
            </IconWithDualBgColor>
            <h2 className="h3">Risk Manager</h2>
            <p>Financial, Operational and Strategic risks - all catered for under one platform.</p>
            <ul className="styleless">
              <li>
                <FontAwesomeIcon icon={faCircleCheck}/>
                <span>Support for multi-level and jurisdiction organizations</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck}/>
                <span>Risk library and risk instances fully customizable</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck}/>
                <span>Audited review, allocation and history of risks</span>
              </li>
            </ul>
          </div>
          {!playRiskModuleVideo ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
            <div className="video-preview" role="button" onClick={handlePlayRiskModuleVideo}>
              <img src="/images/landing/risk-mobile.png" alt="GRC Risk module" className="mobile"/>
              <img src="/images/landing/risk-desktop.png" alt="GRC Risk module" className="desktop"/>
              <button className="button icon-only light"><FontAwesomeIcon icon={faCirclePlay}/></button>
            </div>
          ) : (
            <VideoPlayer url="https://youtu.be/6oXm6jA5h_M" autoPlay/>
          )}
        </section>

        <section id="policies" className="product-module">
          <div>
            <IconWithDualBgColor>
              <FontAwesomeIcon icon={faSquareCheck}/>
            </IconWithDualBgColor>
            <h2 className="h3">Policy Manager</h2>
            <p>Take the pain out of Policies, Instructions, Guidelines, and Handbooks.</p>
            <ul className="styleless">
              <li>
                <FontAwesomeIcon icon={faCircleCheck}/>
                <span>Tag policies to those teams covered by the policy</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck}/>
                <span>Review, approve and publish workflow</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck}/>
                <span>Auditable history of all changes and archived versions stored on your company’s own server</span>
              </li>
            </ul>
          </div>
          {!playPolicyModuleVideo ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
            <div className="video-preview" role="button" onClick={handlePlayPolicyModuleVideo}>
              <img src="/images/landing/policy-mobile.png" alt="GRC Policy module" className="mobile"/>
              <img src="/images/landing/policy-desktop.png" alt="GRC Policy module" className="desktop"/>
              <button className="button icon-only light"><FontAwesomeIcon icon={faCirclePlay}/></button>
            </div>
          ) : (
            <VideoPlayer url="https://youtu.be/3u88GOCW-68" autoPlay/>
          )}
        </section>

        <section id="vendors" className="product-module">
          <div>
            <IconWithDualBgColor>
              <FontAwesomeIcon icon={faFileSignature}/>
            </IconWithDualBgColor>
            <h2 className="h3">Vendor Manager</h2>
            <p>Keep your contracts, vendors, audits in one place.</p>
            <ul className="styleless">
              <li>
                <FontAwesomeIcon icon={faCircleCheck}/>
                <span>Simple periodic audits and follow up of vendors for EBA, DORA and other requirements</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck}/>
                <span>Allow Legal, Sales, Procurement & Vendor Management to work on same platform and data</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCircleCheck}/>
                <span>Track agreements by type, counterparty and conditions</span>
              </li>
            </ul>
          </div>
          <img src="/images/landing/vendor-mobile.png" alt="GRC Vendor module" className="mobile"/>
          <img src="/images/landing/vendor-desktop.png" alt="GRC Vendor module" className="desktop"/>
        </section>

        <section id="get-synergy">
          <div className="container">
            <header>
              <span>Get synergy</span>
              <h2>Modules working perfectly together</h2>
              <p>And the powerful common features they share.</p>
            </header>
            <ul className="styleless">
              <li>
                <IconWithDualBgColor>
                  <FontAwesomeIcon icon={faClockRotateLeft}/>
                </IconWithDualBgColor>
                <h3>Full auditable history</h3>
                <p>Track changes and approvals. Store previous versions of all key documents. Maintain clear lines of responsibility in times of
                  change.</p>
              </li>
              <li>
                <IconWithDualBgColor>
                  <FontAwesomeIcon icon={faFileWord}/>
                </IconWithDualBgColor>
                <h3>Leverage existing documents</h3>
                <p>Integration with OneDrive, Sharepoint, Teams and Google Drive. Protect key documents by storing in your existing folder
                  structure.</p>
              </li>
              <li>
                <IconWithDualBgColor>
                  <FontAwesomeIcon icon={faBell}/>
                </IconWithDualBgColor>
                <h3>Reminders</h3>
                <p>Preset scheduled reminders, or simply nudge responsible people for updates when you need an update.</p>
              </li>
              <li>
                <IconWithDualBgColor>
                  <FontAwesomeIcon icon={faCircleNodes}/>
                </IconWithDualBgColor>
                <h3>Cross-reference objects</h3>
                <p>Increase insight through connections between policies, risks, vendors, controls and processes.</p>
              </li>
              <li>
                <IconWithDualBgColor>
                  <FontAwesomeIcon icon={faStamp}/>
                </IconWithDualBgColor>
                <h3>Certification-ready</h3>
                <p>Basel framework, DORA and ISO compliance ensured, with excellent flexibility, future proofing the solutions.</p>
              </li>
            </ul>
          </div>
        </section>

        <section id="pricing">
          <header>
            <span>Pricing</span>
            <h2>Enterprise software pricing can be simple</h2>
            {/* <h2>Sign up for 30-day free trial. No credit card required.</h2> */}
          </header>

          <ul className="styleless">
            <li>
              <div className="pricing-data">
                <h3>Policy module</h3>
                <div>
                  <span>199 €</span>
                  <span>/ month</span>
                </div>
                <ul className="styleless">
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Unlimited policies</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Track revisions and approvals</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Publish to PDF</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Reminders</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Tag owner groups</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Tag legal entities</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Full auditable history</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Cross-reference processes and controls</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Integration with OneDrive or Google Drive</span>
                  </li>
                </ul>
              </div>
              <div className="pricing-cta">
                {/* <button className="button">Start your free trial</button> */}
                <Link
                  to="/contact"
                  className="underlined appears"
                  onClick={() => triggerAnalyticsEvent(AnalyticsEvent.CLICK_PRICE_CTA_TIER_1)}
                >
                  CONTACT US
                </Link>
              </div>
            </li>
            <li>
              <div className="pricing-data">
                <h3>Risk module</h3>
                <div>
                  <span>399 €</span>
                  <span>/ month</span>
                </div>
                <ul className="styleless">
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Risk library</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Risk taxonomy</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Configurable heatmaps</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Support for multiple organization levels</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Tag processes and controls</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Board dashboard</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Full auditable history</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Basel framework compliant</span>
                  </li>
                </ul>
              </div>
              <div className="pricing-cta">
                <Link
                  to="/contact"
                  className="underlined appears"
                  onClick={() => triggerAnalyticsEvent(AnalyticsEvent.CLICK_PRICE_CTA_TIER_2)}
                >
                  CONTACT US
                </Link>
              </div>
            </li>
            <li>
              <div className="pricing-data">
                <h3>Vendor module</h3>
                <div>
                  <span>599 €</span>
                  <span>/ month</span>
                </div>
                <ul className="styleless">
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Contract database</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Vendor risk assessments</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Reminders</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Vendor upload of requested KPIs and audits</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Full auditable history</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>Integration with OneDrive or Google Drive</span>
                  </li>
                  <li>
                    <div className="icon-with-bg-color">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <span>DORA/EBA Outsourcing compatible</span>
                  </li>
                </ul>
              </div>
              <div className="pricing-cta">
                <Link
                  to="/contact"
                  className="underlined appears"
                  onClick={() => triggerAnalyticsEvent(AnalyticsEvent.CLICK_PRICE_CTA_TIER_3)}
                >
                  CONTACT US
                </Link>
              </div>
            </li>
          </ul>
        </section>

        <section id="company-overview">
          <header>
            <span>One more thing...</span>
            <h2>Company Overview</h2>
            <p>All GRACE modules share a single source of truth for your company data.</p>
          </header>

          <div className="text-block-and-img">
            <ul className="styleless">
              <li>
                <div className="icon-with-square-border">
                  <FontAwesomeIcon icon={faScaleBalanced}/>
                </div>
                <div>
                  <h3>Company legal structure</h3>
                  <p>Track and map your ownership structure, jurisdictions, boards, and officers.</p>
                </div>
              </li>
              <li>
                <div className="icon-with-square-border">
                  <FontAwesomeIcon icon={faSitemap}/>
                </div>
                <div>
                  <h3>Company management structure</h3>
                  <p>Track and map your management structure, departments, divisions, units, managers.</p>
                </div>
              </li>
              <li>
                <div className="icon-with-square-border">
                  <FontAwesomeIcon icon={faArrowRightArrowLeft}/>
                </div>
                <div>
                  <h3>Connect GRACE to your IT infrastructure</h3>
                  <p>Connect with your existing applications via our REST API. For example: feed your incidents or contracts from existing solutions
                    for an overview in GRACE.</p>
                </div>
              </li>
            </ul>
            <img src="/images/landing/home-mobile.png" alt="App preview" className="mobile"/>
            <img src="/images/landing/home-desktop.png" alt="App preview" className="desktop"/>
          </div>
        </section>
      </main>
    </div>
  )
}
