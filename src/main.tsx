import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "./UI/App.tsx"

import "normalize.css"
import "@mantine/core/styles.css"
import "./main.scss"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Unable to mount the app: no element with the id \"root\" was found")
}

createRoot(rootElement).render(
  <StrictMode>
    <App/>
  </StrictMode>
)
