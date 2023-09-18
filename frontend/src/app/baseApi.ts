// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";
const baseUrl = process.env.API_URL;
import jwt_decode from "jwt-decode";
import { RootState } from "./store";
// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const { access } = (getState() as RootState).auth;
      // If we have a token set in state, let's assume that we should be passing it.
      if (access) {
        const token: { exp: number } = jwt_decode(access);
        if (token.exp < Date.now() / 1000) {
          logout();
        }
        headers.set("authorization", `Bearer ${access}`);
      }
      return headers;
    },
    baseUrl: baseUrl
  }),
  endpoints: () => ({})
});
