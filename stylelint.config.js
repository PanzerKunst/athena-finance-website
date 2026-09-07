export default {
  customSyntax: "postcss-scss",
  extends: ["stylelint-config-standard-scss"],
  rules: {
    "at-rule-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "declaration-empty-line-before": null,
    "max-nesting-depth": 5,
    "no-descending-specificity": null,
    "selector-class-pattern": null,

    // `:export` is a CSS Modules construct: the compiler turns it into a JS object rather than
    // CSS, so Stylelint reads the selector as an unknown pseudo-class, and each exported variable
    // as an unknown property. Both exemptions stay scoped to that block, so real typos elsewhere
    // are still reported.
    "property-no-unknown": [true, { ignoreSelectors: [":export"] }],
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["export"] }],

    "scss/dollar-variable-empty-line-before": null,
    "scss/function-no-unknown": null,

    // The rule is meant for partial file names (`@use "_mixins"`), but it also fires on any
    // directory whose name starts with an underscore -- which `_CommonStyles/` always will.
    "scss/load-no-partial-leading-underscore": null
  }
}
