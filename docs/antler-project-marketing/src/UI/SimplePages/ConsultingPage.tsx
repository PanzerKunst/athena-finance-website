import "./SimplePage.scss"
import "./ConsultingPage.scss"

export function ConsultingPage() {
  return (
    <div className="page simple consulting">
      <main>
        <div className="container">
          <div>
            <h1>Consulting and Development</h1>
            <p>We design, fix, build and maintain solutions for financial services companies: fixing APIs, creating dashboards and automating
              processes.</p>
            <p>Take advantage of a unique combination of experience and technical expertise.</p>
            <p>Send an email to <span className="underlined disappears">grace@chelsea.se</span> and we’ll get in touch!</p>
          </div>
        </div>

        <div className="container two-col">
          <div>
            <h2>Richard Calvert-Smith</h2>
            <p>Richard Calvert-Smith is a specialist in financial services, with expertise in Operations, Risk, Compliance and Law from Banks,
              Insurance Companies and Investment Managers.</p>
          </div>
          <img src="/images/consulting/richard-desktop.jpg" alt="Richard Calvert-Smith" className="desktop"/>
        </div>
        <img src="/images/consulting/richard-mobile.jpg" alt="Richard Calvert-Smith" className="mobile"/>

        <div className="container two-col">
          <div>
            <h2>Christophe Bram</h2>
            <p>Christophe is a hands-on tech lead. He has built robust web and API solutions for multiple industries over the years. He focuses on
              providing value as quickly as possible, yet without ever cutting corners.</p>
          </div>
          <img src="/images/consulting/christophe-desktop.jpg" alt="Christophe Bram" className="desktop"/>
        </div>
        <img src="/images/consulting/christophe-mobile.jpg" alt="Christophe Bram" className="mobile"/>
      </main>
    </div>
  )
}
