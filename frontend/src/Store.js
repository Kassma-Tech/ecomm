import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import cartSlice from "./features/cartSlice";
import authSlice from "./features/authSlice";
import apiSlice from "./api/apiSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
