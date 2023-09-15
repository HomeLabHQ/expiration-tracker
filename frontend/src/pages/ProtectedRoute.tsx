import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useAppSelector((state) => state)
  const location = useLocation()
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export default ProtectedRoute
