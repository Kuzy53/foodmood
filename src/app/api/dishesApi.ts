import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dishesApi = createApi({
  reducerPath: "dishesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://foodmood.menu/api/v1/" }),
  endpoints: (builder) => ({
    getDishes: builder.query({
      query: (restaurantId: string) => `restaurants/${restaurantId}`,
    }),
    getDishById: builder.query({
      query: (id) => `dishes/${id}`,
      transformResponse: (response: any) => response.payload.dish,
    }),
    getCategory: builder.query({
      query: () => `categories/`,
    }),
    searchDishes: builder.query({
      query: (searchTerm) =>
        `dishes/search/b614a174-5a04-4125-9a83-7b97c6a4ddc1/${searchTerm}`,
      transformResponse: (response: any) => response.payload.matchedDishes,
    }),
  }),
});

export const {
  useGetDishesQuery,
  useGetDishByIdQuery,
  useGetCategoryQuery,
  useSearchDishesQuery,
} = dishesApi;
