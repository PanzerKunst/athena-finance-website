import { MantineProvider } from "@mantine/core"
import { createBrowserRouter, RouterProvider } from "react-router"

import { LandingPage } from "./LandingPage/LandingPage.tsx"
import { Layout } from "./_CommonComponents/Layout.tsx"

import "./App.scss"

const router = createBrowserRouter([
  {
    path: "/", element: <Layout/>, children: [
      { path: "/", element: <LandingPage/> }
    ]
  }
])

export function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <RouterProvider router={router}/>
    </MantineProvider>
  )
}
