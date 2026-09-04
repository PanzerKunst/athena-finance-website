import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy"
import classNames from "classnames"
import { ChangeEvent, KeyboardEvent, useState } from "react"

import { ButtonLoader } from "./ButtonLoader.tsx"
import { subscribeToMailingList } from "../../Data/Apis/Backend/MailingApi.ts"
import { AnalyticsEvent, triggerAnalyticsEvent } from "../../Util/AnalyticsUtils.ts"
import { Field, isValidEmail } from "../../Util/ValidationUtils.ts"

import "./SubscribeToMailingListForm.scss"

export function SubscribeToMailingListForm() {
  const [emailField, setEmailField] = useState<Field>({ value: "", error: "" })
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setEmailField({
      value,
      error: "" // We reset any eventual errors
    })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      void handleFormSubmit()
    }
  }

  function isEmailFieldValid(): boolean {
    const email = emailField.value

    if (email === "") {
      setEmailField({ value: email, error: "Email is required" })
      return false
    }

    if (!isValidEmail(email)) {
      setEmailField({ value: email, error: "Invalid email, sorry" })
      return false
    }

    return true
  }

  function isFormValid(): boolean {
    return isEmailFieldValid()
  }

  const handleFormSubmit = async () => {
    if (!isFormValid()) {
      return
    }

    setIsSubmittingForm(true)
    await subscribeToMailingList(emailField.value)
    triggerAnalyticsEvent(AnalyticsEvent.SUBSCRIBE_TO_MAILING_LIST)
    setIsSubmittingForm(false)

    setIsSubscribed(true)
  }

  return (
    <div className="subscribe-to-mailing-list">
      {isSubscribed ? (
        <div className="subscribed">
          <span>Welcome to the mailing list!</span>
          <span>🎉</span>
        </div>
      ) : (
        <FormControl error={emailField.error !== ""}>
          <FormLabel>Get notified when we launch</FormLabel>
          <div>
            <Input
              variant="soft"
              size="lg"
              type="email"
              placeholder="your@mail.com"
              required
              value={emailField.value}
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className={classNames("button lg", { loading: isSubmittingForm })}
              disabled={isSubmittingForm || emailField.error !== ""}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleFormSubmit}
            >
              {isSubmittingForm && <ButtonLoader/>}
              <span>Subscribe</span>
            </button>
          </div>
          {emailField.error !== "" && <FormHelperText>{emailField.error}</FormHelperText>}
        </FormControl>
      )}
    </div>
  )
}
