import { fileURLToPath } from "node:url"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import checker from "vite-plugin-checker"

const lintCommand = "eslint . --report-unused-disable-directives --max-warnings 0"

// https://vite.dev/config/
// eslint-disable-next-line no-restricted-syntax
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === "development" && checker({
      typescript: true,
      eslint: { lintCommand, useFlatConfig: true }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // Lets every stylesheet reach the shared partials with `@use "UI/_CommonStyles" as *`
        loadPaths: [fileURLToPath(new URL("./src", import.meta.url))]
      }
    }
  },
  build: {
    manifest: true,
    sourcemap: true
  }
}))
