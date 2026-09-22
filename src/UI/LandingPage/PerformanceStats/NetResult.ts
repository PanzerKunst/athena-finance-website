import classNames from "classnames"

// The generated P&L is rounded to whole dollars, so trailing cents would only be noise
export const pnlFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  signDisplay: "always"
})

// A gain and a loss are told apart by their color as much as by their sign
export function netResultClassName(pnl: number): string {
  return classNames("net-result", { negative: pnl < 0 })
}
