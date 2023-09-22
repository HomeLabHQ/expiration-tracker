import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";
const baseUrl = process.env.API_URL;
import jwt_decode from "jwt-decode";
import { RootState } from "./store";
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const { access } = (getState() as RootState).auth;
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
