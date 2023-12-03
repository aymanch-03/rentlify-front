/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const getAllCategories = createAsyncThunk(
  "Categories/getAllCategories",
  async (Categories) => {
    const request = await axios.get("/categories", Categories, {
      withCredentials: true,
    });
    const response = await request.data.data;
    // console.log(response);
    return response;
  }
);

const categorySlice = createSlice({
  name: "Categories",
  initialState: {
    data: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.isLoading = false;
        // console.log(action.payload);
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        console.log(action.error.message);
      });
  },
});

export default categorySlice.reducer;
