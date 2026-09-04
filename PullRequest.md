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

## Step 1

`AppHeader.tsx:59` — `<Burger opened={isDrawerOpen} onClick={openDrawer}>` animates to the "close" state but can only ever open. Harmless in practice (the Drawer's overlay covers it), but `toggle` would match what the icon claims.

<!--
I've added `public/images/athena.svg`. Can you use that as the site's favicon.

On top of that, if you can add it as prefix to "Athena Finance" located in the header and footer. For those, the icon's colour used should ideally be `$color-icon`
-->
