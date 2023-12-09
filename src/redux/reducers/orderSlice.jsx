/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../axios";

let userToken;
export const listOrders = createAsyncThunk("orders/listOrders", async () => {
  userToken = Cookies.get("userToken");
  const request = await axios.get("/orders", {
    headers: {
      "x-user-token": userToken,
    },
    withCredentials: true,
  });
  const response = await request.data.data;
  return response;
});

export const createNewOrder = createAsyncThunk("orders/createNewOrder", async (order, { rejectWithValue }) => {
  try {
    console.log("Order: ", order);
    const response = await axios.post(`orders`, order);
    console.log("response: ", response.data);
    return response.data.data;
  } catch (error) {
    rejectWithValue(error.response.data);
  }
})

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
      })
      .addCase(createNewOrder.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        console.log(action.error.message);
      })
    // eslint-disable-next-line no-unused-vars
  },
});

export default orderSlice.reducer;
