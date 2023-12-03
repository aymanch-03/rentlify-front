/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const listListings = createAsyncThunk(
  "products/listListings",
  async () => {
    try {
      const request = await axios.get("/listings", {
        withCredentials: true,
      });
      const response = await request.data.data;
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    isLoading: false,
  },
  //   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listListings.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(listListings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(listListings.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
