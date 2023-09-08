import { createSlice } from "@reduxjs/toolkit"
import backendApi from "../../app/api"
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("access") || null,
    refresh: localStorage.getItem("refresh") || null,
    isAuthenticated: false,
    user: {},
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      state.access = null
      state.isAuthenticated = false
      state.user = {}
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      backendApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.access = payload.access
        state.refresh = payload.refresh
        state.isAuthenticated = true
        localStorage.setItem("access", payload.access)
        localStorage.setItem("refresh", payload.refresh)
      },
    )
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
