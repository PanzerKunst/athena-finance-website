import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { LandingPage } from "./LandingPage.tsx"
import { ConsultingPage } from "./SimplePages/ConsultingPage.tsx"
import { ContactPage } from "./SimplePages/ContactPage.tsx"
import { SurveyPage } from "./SimplePages/SurveyPage.tsx"
import { Layout } from "./_CommonComponents/Layout.tsx"
import { AppContextProvider } from "../AppContext.tsx"

import "./App.scss"

const router = createBrowserRouter([
  {
    path: "/", element: <Layout/>, children: [
      { path: "/", element: <LandingPage/> },
      { path: "contact", element: <ContactPage/> },
      { path: "survey", element: <SurveyPage/> },
      { path: "consulting", element: <ConsultingPage/> }
    ]
  }
])

export function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router}/>
    </AppContextProvider>
  )
}
