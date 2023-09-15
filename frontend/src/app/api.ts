import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "./store"
import jwt_decode from "jwt-decode"
import _ from "lodash"
const baseUrl = process.env.API_URL
const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const { access, refresh } = (getState() as RootState).auth
      // If we have a token set in state, let's assume that we should be passing it.
      if (access) {
        const token: { exp: number } = jwt_decode(access)
        if (token.exp < Date.now() / 1000) {
          const [refreshToken] = backendApi.useRefreshMutation()
          refreshToken({ refresh: refresh })
        }
        headers.set("authorization", `Bearer ${access}`)
      }
      return headers
    },
    baseUrl: baseUrl,
  }),
  tagTypes: ["Items", "Items-choices", "Locations", "Item-suggestions"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}auth/`,
        method: "POST",
        body: body,
      }),
    }),
    refresh: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}auth/refresh/`,
        method: "POST",
        body: body,
      }),
    }),
    verify: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}auth/verify/`,
        method: "POST",
        body: body,
      }),
    }),
    getItems: builder.query<Items, void>({
      query: () => `items/items/`,
      providesTags: ["Items"],
    }),
    addItem: builder.mutation<BaseItem, Partial<BaseItem>>({
      query(body) {
        return {
          url: `items/items/`,
          method: "POST",
          body,
        }
      },
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data: addItem } = await queryFulfilled
          dispatch(
            backendApi.util.updateQueryData(
              "getItems",
              undefined,
              (draftItems) => {
                draftItems?.results?.push(addItem)
              },
            ),
          )
        } catch (err) {
          console.log(err)
        }
      },
    }),
    getItemsChoices: builder.query<Choice[], void>({
      query: () => `items/items/choices/`,
      providesTags: ["Items-choices"],
    }),
    getLocations: builder.query<Locations, void>({
      query: () => `items/locations/`,
      providesTags: ["Locations"],
    }),
    addLocation: builder.mutation<Location, Partial<Location>>({
      query(body) {
        return {
          url: `items/locations/`,
          method: "POST",
          body,
        }
      },
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data: addLocation } = await queryFulfilled
          dispatch(
            backendApi.util.updateQueryData(
              "getLocations",
              undefined,
              (draftItems) => {
                draftItems?.results?.push(addLocation)
              },
            ),
          )
        } catch (err) {
          console.log(err)
        }
      },
    }),

    updateItem: builder.mutation<
      BaseItem,
      Partial<PayloadItem> & Pick<BaseItem, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `/items/items/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: updateItem } = await queryFulfilled
          dispatch(
            backendApi.util.updateQueryData(
              "getItems",
              undefined,
              (draftItems) => {
                const target = _.findIndex(draftItems.results, { id: id })
                draftItems.results[target] = { ...updateItem }
              },
            ),
          )
        } catch (err) {
          console.log(err)
        }
      },
    }),
    searchItem: builder.mutation<SearchResult[], Search>({
      query(body) {
        return {
          url: `items/items/search/`,
          method: "POST",
          body,
        }
      },
    }),
  }),
})
export const {
  useLoginMutation,
  useRefreshMutation,
  useVerifyMutation,
  useAddItemMutation,
  useGetItemsQuery,
  useUpdateItemMutation,
  useGetLocationsQuery,
  useAddLocationMutation,
  useGetItemsChoicesQuery,
  useSearchItemMutation,
} = backendApi

export default backendApi
