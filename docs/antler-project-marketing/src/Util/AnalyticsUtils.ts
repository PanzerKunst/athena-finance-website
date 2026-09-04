/* eslint-disable no-unused-vars */
export enum AnalyticsEvent {
  SUBSCRIBE_TO_MAILING_LIST = "SUBSCRIBE_TO_MAILING_LIST",
  CLICK_PRICE_CTA_TIER_1 = "CLICK_PRICE_CTA TIER_1",
  CLICK_PRICE_CTA_TIER_2 = "CLICK_PRICE_CTA TIER_2",
  CLICK_PRICE_CTA_TIER_3 = "CLICK_PRICE_CTA TIER_3",
}
/* eslint-enable no-unused-vars */

export type AnalyticsProps = {
  [key: string]: string;
}

export function triggerAnalyticsEvent(event: AnalyticsEvent, props?: AnalyticsProps) {
  const options = props ? { props } : undefined
  window.plausible(event, options)
}
