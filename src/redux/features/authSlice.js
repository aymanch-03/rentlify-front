import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addUser = createAsyncThunk("customer/login", async (customer) => {
  return axios
    .get("http://localhost:5000/v1/customers", customer)
    .then((res) => res.data)
    .catch((err) => err);
});

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customer: [],
  },
  reducers: {},
});

export default customerSlice.reducer;
