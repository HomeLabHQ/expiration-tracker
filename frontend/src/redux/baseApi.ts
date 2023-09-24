import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.API_URL;
import { RootState } from "./store";
import { AuthRefreshCreateApiResponse } from "./api";
import { logout, refreshToken } from "./authSlice";

interface FailAuthResponse {
  code: string;
  detail: string;
  message: string;
}
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

const tokenRefreshFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error?.status === 401 &&
    (result.error?.data as FailAuthResponse).code === "token_not_valid"
  ) {
    // Try to fetch new access token with refresh token from local storage
    const refreshResult = await baseQuery(
      {
        url: "/api/auth/refresh/",
        method: "POST",
        body: {
          refresh: localStorage.getItem("refresh")
        }
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      // Save new access token in auth slice and local storage
      const data = refreshResult.data as AuthRefreshCreateApiResponse;
      await api.dispatch(
        refreshToken({
          access: data.access
        })
      );
      // Retry the initial query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh token invalid, force logout/login
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  baseQuery: tokenRefreshFetchBase,
  endpoints: () => ({}),
  refetchOnReconnect: true
});

export default baseApi;
