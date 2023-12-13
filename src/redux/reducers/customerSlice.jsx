/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../axios";
let userToken;

export const listCustomers = createAsyncThunk(
  "customers/listCustomers",
  async () => {
    userToken = Cookies.get("userToken");
    const request = await axios.get("/customers", {
      headers: {
        "x-user-token": userToken,
      },
      withCredentials: true,
    });
    const response = await request.data.data;
    return response;
  }
);
export const getProfile = createAsyncThunk("customers/getProfile", async () => {
  let clientToken = Cookies.get("clientToken");
  const request = await axios.get("/customers/profile", {
    headers: {
      "x-client-token": clientToken,
    },
    withCredentials: true,
  });
  const response = await request.data.data;

  return response;
});
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
      userToken = Cookies.get("userToken");
      const response = await axios.get(`/customers/${id}`, {
        headers: {
          "x-user-token": userToken,
        },
      });
      console.log();
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
      userToken = Cookies.get("userToken");
      const response = await axios.put(`/customers/${id}`, newCustomerData, {
        headers: {
          "x-user-token": userToken,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "customers/updateProfile",
  async (newCustomerData, { rejectWithValue }) => {
    try {
      let clientToken = Cookies.get("clientToken");

      const response = await axios.patch(
        `/customers/profile/update`,
        newCustomerData,
        {
          headers: {
            "x-client-token": clientToken,
          },
        }
      );
      console.log(response.data);
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
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customer = action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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

        state.error = null;
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
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

        state.error = null;
      });
  },
});

export default customerSlice.reducer;
