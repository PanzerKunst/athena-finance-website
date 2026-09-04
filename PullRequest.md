# Guidelines

TypeScript:
- Whenever possible, `null` should be avoided, using `undefined` instead. This includes the return value for React components.
- Declare TypeScript types, not interfaces.
- Leverage code existing in `src/Util` when possible.

SCSS:
- Declare 

Following a Pull Request implementation, run the "lint" script declared in package.json.

# The task to work on

This is currently an empty project, so the first task is to create the skeleton. We're building a React SPA packaged via Vite.

## Architecture

The architecture will be inspired by an existing codebase: `docs/antler-project-marketing`. It was a couple years ago now, so code and librarires are outdated, but we're interested in following its general architecture. The idea is to keep the structural patterns, but use modern libraries and linting practices. For component library, we'll use Mantine instead of Material UI. The `athena-finance-website` webapp does not connect to a backend server for the time being.

Notes:
- `@import` is deprecated in modern SCSS. Use `@use`/`@forward` instead.
- `.eslintrc.cjs` is eslintrc format; ESLint 9/10 needs `eslint.config.js`. Mostly mechanical, except `eslint-plugin-css-import-order` only ships an eslintrc-style config, so would be dropped.
- Branding: should follow color the mockup's color palette, not the GRACE one. But we're using the same fonts as `docs/antler-project-marketing`.
- `lint` script: should also run Stylelint. 

### Entry point and routing

`src/main.tsx` mounts the app. All routes are declared in `src/UI/App.tsx` using `createBrowserRouter`. Every route must be nested under the `<Layout>` child, which wraps content with `<AppHeader>`, `<AppFooter>`, and `<ScrollRestoration>`.

### Styles

- Every component has a co-located `.scss` file.
- Shared partials (`_colors.scss`, `_mixins.scss`, `_typography.scss`, etc.) live in `src/UI/_CommonStyles/`.
- Mantine component overrides go in a `3rdPartyOverrides/` subdirectory under `_CommonStyles/` — import them from the main app stylesheet, not inside individual component files.
- The Font Awesome library is replaced by Tabler, which is Mantine's ecosystem default
- SCSS nesting is capped at depth 5 (enforced by Stylelint).

## Scope of work

- `App.tsx` should only declare the landing page.

## Mistakes in the reference code, to fix in our app

- ValidationUtils.ts:isValidIsoDateString — date.toISOString() === dateString rejects valid ISO 8601 strings. "2026-09-03T10:00:00Z" passes the regex, but toISOString() returns "2026-09-03T10:00:00.000Z", so it returns false. Any input with a non-UTC offset or without milliseconds fails. -> This is acceptable
- config.ts — import.meta.env.VITE_BACKEND_URL! asserts non-null on an env var that may be undefined, producing a "undefined/email" fetch URL rather than a clear failure. -> Shouldn't be a concern, since we're not using any backend for now.

The other bugs should be fixed.

## Context clarifications:

- What goes inside the landing page? -> Skeleton plus the mockup's real content
- AppHeader has nothing to navigate to -> keep the scroll-to-section nav pointing at the landing page's 01 / 02 anchors
- Fonts -> only import and use `Inter`

- Mantine creates two sources of truth for design tokens ->
  ¤ _colors.scss / _numbers.scss are the single source of truth, in SCSS.
  ¤ 3rdPartyOverrides/_mantine.scss assigns those SCSS variables into Mantine's CSS variables.
  ¤ No color literal is ever written in TS, and createTheme stays minimal.

- Data/, analytics, and the mailing-list form have no target -> Unused in out app, so code can be omitted
- AppContext exists solely to pass headerTitle between a route and the header -> AppContext can be omitted
- With the form, loader and AppContext all dropped, Mantine has almost no consumer left in this PR -> We will add more interactivity in the future. Let's keep Mantine.
- AnimatedBrandName is GRACE-specific -> Drop it
- Rust logo -> taken from Tabler
- AppHeader still has no visual reference -> fixed and auto-hiding on scroll (with the `lastScrollY` / `style.top` bugs fixed), 60px, white with a `#dfe5eb` bottom hairline rather than the reference's drop-shadow, `ATHENA FINANCE` left, `HOW WE WORK` / `PERFORMANCE` right in the mockup's uppercase letter-spaced label style, Mantine `Burger` + `Drawer` on mobile, and `scroll-margin-top: $header-height` on the sections so anchored headings clear it