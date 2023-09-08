import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "./store"
import jwt_decode from "jwt-decode"
import _ from "lodash"
const baseUrl = process.env.API_URL
const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const { access } = (getState() as RootState).auth
      // If we have a token set in state, let's assume that we should be passing it.
      if (access) {
        const token: { exp: number } = jwt_decode(access)
        if (token.exp < Date.now() / 1000) {
          // * Expired token attempt refresh
          localStorage.removeItem("access")
        }
        headers.set("authorization", `Bearer ${access}`)
      }
      return headers
    },
    baseUrl: baseUrl,
  }),
  tagTypes: ["Items", "Items-choices", "Locations"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}auth/`,
        method: "POST",
        body: body,
      }),
    }),
    getItems: builder.query<Items, void>({
      query: () => `items/`,
      providesTags: ["Items"],
    }),
    getItemsChoices: builder.query<Choice[], void>({
      query: () => `items/choices/`,
      providesTags: ["Items-choices"],
    }),
    getLocations: builder.query<Locations, void>({
      query: () => `items/locations/`,
      providesTags: ["Locations"],
    }),
    // getItemsByCategory: builder.query<
    //   Items,
    //   { category: BaseItem["category"] }
    // >({
    //   query: (arg) => {
    //     console.log(arg)
    //     return {
    //       url: "items/",
    //       // params: { start, end },
    //     }
    //   },
    //   providesTags: ["Items"],
    // }),

    updateItem: builder.mutation<
      BaseItem,
      Partial<BaseItem> & Pick<BaseItem, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `items/${id}/`,
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
  }),
})
export const {
  useLoginMutation,
  useGetItemsQuery,
  useUpdateItemMutation,
  useGetItemsChoicesQuery,
} = backendApi

export default backendApi
