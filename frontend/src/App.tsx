import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from "./pages/ProtectedRoute"
import { ConfigProvider, theme } from "antd"
import { useAppSelector } from "./app/hooks"

export default function App() {
  const { mode } = useAppSelector((state) => state.auth)
  const { darkAlgorithm, defaultAlgorithm } = theme
  return (
    <ConfigProvider
      theme={{ algorithm: mode == "dark" ? darkAlgorithm : defaultAlgorithm }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}
