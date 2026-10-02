import eslintReact from "@eslint-react/eslint-plugin"
import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import { defineConfig } from "eslint/config"
import importX from "eslint-plugin-import-x"
import jsxA11y from "eslint-plugin-jsx-a11y-x"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

// eslint-plugin-react-hooks, backed by the React Compiler, stays the source of truth for hook rules:
// switch off the reimplementations of those same rules that ESLint React also ships
const eslintReactHookRulesOff = Object.fromEntries(
  Object.keys(eslintReact.configs["disable-conflict-eslint-plugin-react-hooks"].rules)
    .map(rule => [rule.replace("react-hooks/", "@eslint-react/"), "off"])
)

export default defineConfig(
  { ignores: ["dist", "docs"] },

  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  eslintReact.configs["strict-type-checked"],
  { rules: eslintReactHookRulesOff },
  jsxA11y.configs.strict,
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
      "@stylistic/jsx-max-props-per-line": ["error", { maximum: 3 }],
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
      "@eslint-react/no-unstable-context-value": "error",
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
    extends: [tseslint.configs.disableTypeChecked, eslintReact.configs["disable-type-checked"]],
    languageOptions: {
      globals: globals.node
    }
  },

  {
    files: ["vite.config.ts", "src/Data/StatsGenerator.ts"],
    languageOptions: {
      globals: globals.node
    }
  }
)
