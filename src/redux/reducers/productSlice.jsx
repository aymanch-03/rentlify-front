/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
// import { useParams } from "react-router-dom";

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
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/products/${id}`);
        return response.data.product;
      } catch (error) {
        rejectWithValue(error.response.data);
      }
    }
  );

  export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ id, product }, { rejectWithValue }) => {
      try {
        const response = axios.put(`/users/${id}`, product);
        return response.data.data;
      } catch (error) {
        rejectWithValue(error.response.data);
      }
    }
  );
export const AddProduct = createAsyncThunk(
    "Product/AddProduct",
    async (Product, { rejectWithValue }) => {
      try {
        const response = await axios.post("/products", Product);
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
        state.product = action.payload;
        console.log("Success", action.payload);
      })
      .addCase(GetProducts.rejected, (state, action) => {
        state.status = "rejected";
        console.error("Error fetching products:", action.error.message);
      })
      .addCase(AddProduct.fulfilled, (state, action) => {
        state.products = [...state.products, action.payload];
        console.log("Success", action.payload);
      })
      .addCase(AddProduct.rejected, (state, action) => {
        state.status = "rejected";
        console.error("Error fetching products:", action.error.message);
      });
  },
});

export default productsSlice.reducer;
