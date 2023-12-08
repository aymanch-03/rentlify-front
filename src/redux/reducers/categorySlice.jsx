/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../axios";

let userToken;

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

export const createCategory = createAsyncThunk(
  "Category/createCategory",
  async (Category) => {
    const request = await axios.post("/categories", Category,{
      withCredentials: true,
    });
    const response = await request.data.category;
    console.log(response);
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "Category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      userToken = Cookies.get("userToken");
      const response = await axios.delete(`/categories/${id}`, {
        headers: {
          "x-user-token": userToken,
        },
      });
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
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
      })
      .addCase(createCategory.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        console.log(action.error.message);
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const data = state.data.filter(
          (data) => data._id !== action.payload._id
        );
        console.log(data);
        state.data = data;
        console.log(state.data);
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default categorySlice.reducer;
