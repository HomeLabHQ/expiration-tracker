import { baseApi as api } from "./baseApi";
export const addTagTypes = ["auth", "items", "locations"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes
  })
  .injectEndpoints({
    endpoints: (build) => ({
      authCreate: build.mutation<AuthCreateApiResponse, AuthCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/`,
          method: "POST",
          body: queryArg.customTokenObtainPairRequest
        }),
        invalidatesTags: ["auth"]
      }),
      authRefreshCreate: build.mutation<AuthRefreshCreateApiResponse, AuthRefreshCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/refresh/`,
          method: "POST",
          body: queryArg.tokenRefreshRequest
        }),
        invalidatesTags: ["auth"]
      }),
      authVerifyCreate: build.mutation<AuthVerifyCreateApiResponse, AuthVerifyCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/verify/`,
          method: "POST",
          body: queryArg.tokenVerifyRequest
        }),
        invalidatesTags: ["auth"]
      }),
      itemsList: build.query<ItemsListApiResponse, ItemsListApiArg>({
        query: (queryArg) => ({
          url: `/api/items/`,
          params: { page: queryArg.page, page_size: queryArg.pageSize, upc: queryArg.upc }
        }),
        providesTags: ["items"]
      }),
      itemsCreate: build.mutation<ItemsCreateApiResponse, ItemsCreateApiArg>({
        query: (queryArg) => ({ url: `/api/items/`, method: "POST", body: queryArg.itemRequest }),
        invalidatesTags: ["items"]
      }),
      itemsRetrieve: build.query<ItemsRetrieveApiResponse, ItemsRetrieveApiArg>({
        query: (queryArg) => ({ url: `/api/items/${queryArg.id}/` }),
        providesTags: ["items"]
      }),
      itemsUpdate: build.mutation<ItemsUpdateApiResponse, ItemsUpdateApiArg>({
        query: (queryArg) => ({
          url: `/api/items/${queryArg.id}/`,
          method: "PUT",
          body: queryArg.itemRequest
        }),
        invalidatesTags: ["items"]
      }),
      itemsPartialUpdate: build.mutation<ItemsPartialUpdateApiResponse, ItemsPartialUpdateApiArg>({
        query: (queryArg) => ({
          url: `/api/items/${queryArg.id}/`,
          method: "PATCH",
          body: queryArg.patchedItemRequest
        }),
        invalidatesTags: ["items"]
      }),
      itemsChoicesRetrieve: build.query<
        ItemsChoicesRetrieveApiResponse,
        ItemsChoicesRetrieveApiArg
      >({
        query: () => ({ url: `/api/items/choices/` }),
        providesTags: ["items"]
      }),
      itemsSearchCreate: build.mutation<ItemsSearchCreateApiResponse, ItemsSearchCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/items/search/`,
          method: "POST",
          body: queryArg.itemSearchRequest
        }),
        invalidatesTags: ["items"]
      }),
      locationsList: build.query<LocationsListApiResponse, LocationsListApiArg>({
        query: (queryArg) => ({
          url: `/api/locations/`,
          params: { page: queryArg.page, page_size: queryArg.pageSize }
        }),
        providesTags: ["locations"]
      }),
      locationsCreate: build.mutation<LocationsCreateApiResponse, LocationsCreateApiArg>({
        query: (queryArg) => ({
          url: `/api/locations/`,
          method: "POST",
          body: queryArg.locationRequest
        }),
        invalidatesTags: ["locations"]
      }),
      locationsRetrieve: build.query<LocationsRetrieveApiResponse, LocationsRetrieveApiArg>({
        query: (queryArg) => ({ url: `/api/locations/${queryArg.id}/` }),
        providesTags: ["locations"]
      })
    }),
    overrideExisting: false
  });
export { injectedRtkApi as backendApi };
export type AuthCreateApiResponse = /** status 200  */ JwtAuthResponse;
export type AuthCreateApiArg = {
  customTokenObtainPairRequest: CustomTokenObtainPairRequestWrite;
};
export type AuthRefreshCreateApiResponse = /** status 200  */ TokenRefreshRead;
export type AuthRefreshCreateApiArg = {
  tokenRefreshRequest: TokenRefreshRequestWrite;
};
export type AuthVerifyCreateApiResponse = unknown;
export type AuthVerifyCreateApiArg = {
  tokenVerifyRequest: TokenVerifyRequestWrite;
};
export type ItemsListApiResponse = /** status 200  */ PaginatedReprBaseItemListRead;
export type ItemsListApiArg = {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  pageSize?: number;
  upc?: string;
};
export type ItemsCreateApiResponse = /** status 201  */ ReprItemRead;
export type ItemsCreateApiArg = {
  itemRequest: ItemRequest;
};
export type ItemsRetrieveApiResponse = /** status 200  */ ReprItemRead;
export type ItemsRetrieveApiArg = {
  /** A unique integer value identifying this item. */
  id: number;
};
export type ItemsUpdateApiResponse = /** status 200  */ ReprItemRead;
export type ItemsUpdateApiArg = {
  /** A unique integer value identifying this item. */
  id: number;
  itemRequest: ItemRequest;
};
export type ItemsPartialUpdateApiResponse = /** status 200  */ ReprItemRead;
export type ItemsPartialUpdateApiArg = {
  /** A unique integer value identifying this item. */
  id: number;
  patchedItemRequest: PatchedItemRequest;
};
export type ItemsChoicesRetrieveApiResponse = /** status 200  */ Choice[];
export type ItemsChoicesRetrieveApiArg = void;
export type ItemsSearchCreateApiResponse =
  /** status 201 Created. New resource in response */ SearchResult[];
export type ItemsSearchCreateApiArg = {
  itemSearchRequest: ItemSearchRequest;
};
export type LocationsListApiResponse = /** status 200  */ PaginatedBaseLocationListRead;
export type LocationsListApiArg = {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  pageSize?: number;
};
export type LocationsCreateApiResponse = /** status 201  */ LocationRead;
export type LocationsCreateApiArg = {
  locationRequest: LocationRequest;
};
export type LocationsRetrieveApiResponse = /** status 200  */ LocationRead;
export type LocationsRetrieveApiArg = {
  /** A unique integer value identifying this location. */
  id: number;
};
export type JwtAuthResponse = {
  access: string;
  refresh: string;
};
export type CustomTokenObtainPairRequest = {};
export type CustomTokenObtainPairRequestWrite = {
  email: string;
  password: string;
};
export type TokenRefresh = {};
export type TokenRefreshRead = {
  access: string;
};
export type TokenRefreshRequest = {};
export type TokenRefreshRequestWrite = {
  refresh: string;
};
export type TokenVerifyRequest = {};
export type TokenVerifyRequestWrite = {
  token: string;
};
export type CategoryEnum = "GOODS" | "MEDICATIONS";
export type StatusEnum = "STOCK" | "OPENED" | "DISPOSED" | "USED";
export type BaseLocation = {
  title: string;
};
export type BaseLocationRead = {
  id: number;
  title: string;
};
export type ReprBaseItem = {
  title: string;
  upc?: string;
  category: CategoryEnum;
  status: StatusEnum;
  opening_date?: string | null;
  expiration_date?: string | null;
  location: BaseLocation;
};
export type ReprBaseItemRead = {
  id: number;
  title: string;
  upc?: string;
  category: CategoryEnum;
  status: StatusEnum;
  opening_date?: string | null;
  expiration_date?: string | null;
  location: BaseLocationRead;
  ttl: number;
};
export type PaginatedReprBaseItemList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: ReprBaseItem[];
};
export type PaginatedReprBaseItemListRead = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: ReprBaseItemRead[];
};
export type ReprItem = {
  title: string;
  upc?: string;
  category: CategoryEnum;
  status: StatusEnum;
  opening_date?: string | null;
  expiration_date?: string | null;
  location: BaseLocation;
};
export type ReprItemRead = {
  id: number;
  title: string;
  upc?: string;
  category: CategoryEnum;
  status: StatusEnum;
  opening_date?: string | null;
  expiration_date?: string | null;
  location: BaseLocationRead;
  ttl: number;
  created_at: string;
};
export type ItemRequest = {
  title: string;
  upc?: string;
  category?: CategoryEnum;
  status?: StatusEnum;
  opening_date?: string | null;
  expiration_date?: string | null;
  location: number;
};
export type PatchedItemRequest = {
  title?: string;
  upc?: string;
  category?: CategoryEnum;
  status?: StatusEnum;
  opening_date?: string | null;
  expiration_date?: string | null;
  location?: number;
};
export type Choice = {
  field: string;
  values: string[];
};
export type SearchResult = {
  title: string;
  href: string;
  body: string;
};
export type ItemSearchRequest = {
  barcode: string;
};
export type PaginatedBaseLocationList = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: BaseLocation[];
};
export type PaginatedBaseLocationListRead = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: BaseLocationRead[];
};
export type Location = {
  title: string;
  description?: string;
};
export type LocationRead = {
  id: number;
  title: string;
  description?: string;
};
export type LocationRequest = {
  title: string;
  description?: string;
};
export const {
  useAuthCreateMutation,
  useAuthRefreshCreateMutation,
  useAuthVerifyCreateMutation,
  useItemsListQuery,
  useItemsCreateMutation,
  useItemsRetrieveQuery,
  useItemsUpdateMutation,
  useItemsPartialUpdateMutation,
  useItemsChoicesRetrieveQuery,
  useItemsSearchCreateMutation,
  useLocationsListQuery,
  useLocationsCreateMutation,
  useLocationsRetrieveQuery
} = injectedRtkApi;
