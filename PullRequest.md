# Guidelines

Leverage the `frontend-design` plugin if available.

TypeScript:
- Whenever possible, `null` should be avoided, using `undefined` instead, including for React components' return value.
- Declare TypeScript types, not interfaces.
- Leverage code existing in `src/Util` when possible.

SCSS: as a general rule, leverage the cascade to mirror the HTML markup as much as possible. More specifically:
- If an element is a direct child, be specific and include `>`
- Nest elements by default, until it reaches the `max-nesting-depth` Stylelint limit

Following a Pull Request implementation, run the "lint" script declared in package.json.

# The task to work on

As part of the "Results" statistics, we want to add some details on the PnL for some coins. These details are for the selected period in the tab.

We want to display the 10 coins which have the largest profit, or loss over the period, in absolute value. Ordered from biggest profit to biggest loss.
Similar to this mockup: `./docs/PnL_per_pair.png`. We'll reuse the same color palette, for profit, and for loss, as the graph.
On a viewport width less than `$vw-lg`, all the list items should be in a single column. Once we get at `$vw-lg`, we want to have the list in 2 columns, to better use the available space.
This new list should be displayed above `All figures in USD, net of trading and funding fees.`

In a similar way as the graph curve is animated upon switching tab, the bars should have a "fill" animation.