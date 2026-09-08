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

## Step 1 (done)

`docs/antler-project-marketing` has some buttons/links with classes `underlined appears`, which creates an underline appearing from the left to right with an animation. We want to add that feature to our project, and apply in `AppHeader.tsx` to the `nav > a` links for desktop. The different text color on hover for those desktop nav links will be removed.

Note: We're keeping the two classes `appears` and `disappears`, as we're planning to use the `disappears` variant in the future.

We want that underline to be a coloured gradient going from `$color-gradient-start` to `$color-gradient-end`:
- `$color-gradient-start: $color-steel-600`
- `$color-gradient-end: $color-steel-500`, a lighter colour, not existing yet.

Existing class `underlined-on-hover` becomes obsolete and should be removed.


## Step 2

`$color-gradient-end` is too close to `$color-gradient-start`, making the gradient almost invisible. Let's replace `$color-steel-500` by `$color-steel-300` and use that for `$color-gradient-end`.