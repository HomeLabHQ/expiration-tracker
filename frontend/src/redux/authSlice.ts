import { createSlice } from "@reduxjs/toolkit";
import { backendApi } from "./api";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("access") || null,
    refresh: localStorage.getItem("refresh") || null,
    isAuthenticated: !!localStorage.getItem("access"),
    user: {},
    mode: "dark"
  },

  reducers: {
    refreshToken: (state, action) => {
      state.access = action.payload.access;
      localStorage.setItem("access", action.payload.access);
    },
    logout: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.access = null;
      state.isAuthenticated = false;
      state.user = {};
    },
    switchTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(backendApi.endpoints.authCreate.matchFulfilled, (state, { payload }) => {
      state.access = payload.access;
      state.refresh = payload.refresh;
      state.isAuthenticated = true;
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
    });
  }
});

export const { logout, switchTheme, refreshToken } = authSlice.actions;

export default authSlice.reducer;
