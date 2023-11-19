/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "../axios";

export const listCustomers = createAsyncThunk(
  "customers/listCustomers",
  async (customers) => {
    const request = await axios.get("/customers", customers, {
      withCredentials: true,
    });
    const response = await request.data.data;
    return response;
  }
);
export const registerCustomer = createAsyncThunk(
  "customer/registerCustomer",
  async (customer, { rejectWithValue }) => {
    try {
      const request = await axios.post("/customers", customer, {
        withCredentials: true,
      });
      const response = await request.data;
      return response;
    } catch (error) {
      rejectWithValue(error);
      return error.response.data;
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    data: [],
    isLoading: false,
  },
  //   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listCustomers.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(listCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.isLoading = false;
        // console.log(action.payload);
      })
      .addCase(listCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        console.log(action.error.message);
      })
      .addCase(registerCustomer.pending, (state, action) => {
        state.isLoading = true;
        state.data = [];
        state.status = "pending";
        state.error = null;
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "fulfilled";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "rejected";
        state.error = action.error;
        console.error(action.error.message.error);
      });
  },
});

export default customerSlice.reducer;
