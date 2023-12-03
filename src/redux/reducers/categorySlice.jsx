/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

<<<<<<< HEAD
export const listCategories = createAsyncThunk(
  "categories/listCategories",
  async () => {
    const request = await axios.get("/categories", {
      withCredentials: true,
    });
    const response = await request.data.data;
=======
export const getAllCategories = createAsyncThunk(
  "Categories/getAllCategories",
  async (Categories) => {
    const request = await axios.get("/categories", Categories, {
      withCredentials: true,
    });
    const response = await request.data.data;
    // console.log(response);
>>>>>>> product-details
    return response;
  }
);

const categorySlice = createSlice({
<<<<<<< HEAD
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
=======
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
>>>>>>> product-details
