import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import { tapiSlice } from "./slices/tapiSlice";
import todoSlice from "./slices/todoSlice";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [tapiSlice.reducerPath]: tapiSlice.reducer,
    auth: authSlice,
    todo:todoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, tapiSlice.middleware),

  devTools: true,
});
