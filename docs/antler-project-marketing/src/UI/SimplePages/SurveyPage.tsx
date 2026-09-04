import "./SurveyPage.scss"

export function SurveyPage() {
  return (
    <div className="page simple survey">
      <main>
        <div className="container">
          <h1>Survey</h1>
          <p>Can you help us shape GRACE into the ideal GRC solution for you?</p>
          <p>We would love to know more about the software you are currently using:</p>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeTyd8caZRCPsnlaOq6L5k0l_v_6zagFOl8YoewDGkSqi3GpQ/viewform?usp=sf_link"
            title="Survey"
          />
        </div>
      </main>
    </div>
  )
}
