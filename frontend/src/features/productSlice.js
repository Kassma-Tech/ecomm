import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../URL/url";

const initialState = {
  products: [],
  singleProduct: '',
  status: "idle",
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "fetch all products",
  async () => {
    try {
      const res = await BASE_URL.get("/api/v1/products");
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "fetch single products",
  async (id) => {
    try {
      const res = await BASE_URL.get(`/api/v1/product/${id}`);
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = [...action.payload]; // handled by immerJS behind the scene
        console.log(action.payload);
      })
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.singleProduct = action.payload;
      })
  },
});

export default productSlice.reducer;
