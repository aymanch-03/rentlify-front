/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const listCategories = createAsyncThunk(
  "categories/listCategories",
  async () => {
    const request = await axios.get("/categories", {
      withCredentials: true,
    });
    const response = await request.data.data;
    return response;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    isLoading: false,
  },
  //   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listCategories.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(listCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(listCategories.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        console.log(action.error.message);
      });
    // eslint-disable-next-line no-unused-vars
  },
});

export default categorySlice.reducer;
