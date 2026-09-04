import { AnalyticsEvent, AnalyticsProps } from "./Util/AnalyticsUtils.ts"

declare global {
  /* eslint-disable no-unused-vars */
  interface Window {
    plausible: (
      event: AnalyticsEvent,
      options?: { props: AnalyticsProps }
    ) => void;
  }
  /* eslint-enable no-unused-vars */
}

export {}
