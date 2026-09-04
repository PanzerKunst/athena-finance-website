import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import importX from "eslint-plugin-import-x"
import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist", "docs"] },

  { settings: { react: { version: "detect" } } },

  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  jsxA11y.flatConfigs.strict,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      "@stylistic": stylistic,
      "import-x": importX
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/max-len": ["warn", { code: 150 }],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "never"],
      "no-restricted-syntax": ["error", {
        selector: "ExportDefaultDeclaration",
        message: "Prefer named exports."
      }],
      "no-unused-vars": "off", // Superseded by the TypeScript-aware rule below
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": "allow-with-description" }],
      "@typescript-eslint/no-unsafe-call": "off",
      "react/jsx-max-props-per-line": ["error", { maximum: 3 }],
      "react/jsx-no-constructed-context-values": "error",
      "react/no-unescaped-entities": "off",
      // The reference config expressed its `pathGroups` as regexes, which this rule reads as
      // globs: they matched nothing. Plain groups say the same thing, and actually apply.
      "import-x/order": ["error", {
        "groups": ["builtin", "external", ["parent", "sibling", "index"]],
        "newlines-between": "always",
        "alphabetize": { "order": "asc" }
      }]
    }
  },

  {
    files: ["**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: globals.node
    }
  },

  {
    files: ["vite.config.ts"],
    languageOptions: {
      globals: globals.node
    }
  }
)
