import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });
export const tapiSlice = createApi({
  baseQuery,
  reducerPath: "todoApiSlice",
  tagTypes: ["Todo"],
  endpoints: (builder) => ({}),
});
