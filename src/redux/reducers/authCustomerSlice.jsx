/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const loginCustomer = createAsyncThunk(
  "customer/loginCustomer",
  async (customer, { rejectWithValue }) => {
    try {
      const request = await axios.post("/customers/login", customer, {
        withCredentials: true,
      });
      const response = await request.data.customer;
      return response;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const authCustomerSlice = createSlice({
  name: "customer",
  initialState: {
    customer: null,
    isLoading: false,
    isAuth: false,
    error: null,
  },
  reducers: {
    logoutCustomer: (state, action) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "fulfilled";
        state.customer = action.payload;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(loginCustomer.pending, (state, action) => {
        state.isLoading = true;
        state.customer = null;
        state.status = "pending";
        state.error = null;
      })

      .addCase(loginCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "rejected";
        state.error = action.error;
        state.isAuth = false;
        console.error(action);
      });
  },
});
export const { logoutCustomer } = authCustomerSlice.actions;
export default authCustomerSlice.reducer;
