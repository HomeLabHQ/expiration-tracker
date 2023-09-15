import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./main.less"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from "./pages/ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
