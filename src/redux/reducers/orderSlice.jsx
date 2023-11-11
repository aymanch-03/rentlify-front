/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const listOrders = createAsyncThunk(
  "orders/listOrders",
  async (orders) => {
    const request = await axios.get("/orders", orders, {
      withCredentials: true,
    });
    const response = await request.data.data;
    return response;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    data: [],
    isLoading: false,
  },
  //   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listOrders.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(listOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(listOrders.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        console.log(action.error.message);
      });
    // eslint-disable-next-line no-unused-vars
  },
});

export default orderSlice.reducer;
