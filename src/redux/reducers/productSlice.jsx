/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { useParams } from "react-router-dom";



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
    "Product/GetProducts",
    async ( { rejectWithValue }) => {
    const {id} = useParams();
    console.log(id);
    try {
      const response = await axios.get(`products/${id}`);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
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
      })
      .addCase(GetProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(GetProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
