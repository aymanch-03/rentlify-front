import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listCustomers = createAsyncThunk(
  "customers/listCustomers",
  async (customers) => {
    const request = await axios.get(
      "http://localhost:5000/v1/customers",
      customers,
      {
        withCredentials: true,
      }
    );
    const response = await request.data.data;
    return response;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    data: [],
  },
  //   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        // console.log(action.payload);
      })
      .addCase(listCustomers.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error.message);
      });
  },
});

export default customerSlice.reducer;
