/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const ListProducts = createAsyncThunk(
  "Product/ListProducts",
  async (Products) => {
    const request = await axios.get("/products", Products, {
      withCredentials: true,
    });
    const response = await request.data;
    localStorage.setItem("Products", JSON.stringify(response));
    return response;
    // console.log(response);
  }
);

export const GetProducts = createAsyncThunk(
  "Product/ListProducts",
  async (Products) => {
    const request = await axios.get("/products/:id", Products, {
      withCredentials: true,
    });
    const response = await request.data;
    localStorage.setItem("Products", JSON.stringify(response));
    // return response;
    console.log(response);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  // reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ListProducts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.products = action.payload;
        console.log("Login Successfully", action.payload);
      })
      .addCase(ListProducts.rejected, (state, action) => {
        state.status = "rejected";
        console.log(action.payload);
      });
  },
});

export default productsSlice.reducer;
