/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  "customers/registerCustomer",
  async (customer, { rejectWithValue }) => {
    try {
      const request = await axios.post("/customers", customer, {
        withCredentials: true,
      });
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCustomer = createAsyncThunk(
  "customers/getCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/customers/${id}`);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, newCustomerData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/customers/${id}`, newCustomerData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    data: [],
    customer: {},
    isLoading: false,
  },
  reducers: {},
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
      })
      .addCase(getCustomer.pending, (state, action) => {
        state.error = null;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customer = action.payload;
        state.error = null;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCustomer.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customer = action.payload;
        const updatedCustomers = state.data.map((customer) => {
          if (customer._id === action.payload._id) {
            return action.payload;
          } else {
            return customer;
          }
        });
        state.data = updatedCustomers;
        console.log(state.data);
        state.error = null;
      });
  },
});

export default customerSlice.reducer;
