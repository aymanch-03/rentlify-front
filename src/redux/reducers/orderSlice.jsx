/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../axios";

let userToken;

export const getOrderById = createAsyncThunk("orders/getOrderById", async (id ) => {
  userToken = Cookies.get("userToken");
  const request = await axios.get(`/orders/${id}`, {
    headers: {
      "x-user-token": userToken,
    },
    withCredentials: true,
  });
  const response = await request.data.data;
  return response;
});


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

export const listHostOrders = createAsyncThunk(
  "orders/listHostOrders",
  async () => {
    let clientToken = Cookies.get("clientToken");
    const request = await axios.get("/orders/host", {
      headers: {
        "x-client-token": clientToken,
      },
      withCredentials: true,
    });
    const response = await request.data.data;
    return response;
  }
);

export const createNewOrder = createAsyncThunk(
  "orders/createNewOrder",
  async (order, { rejectWithValue }) => {
    try {
      let clientToken = Cookies.get("clientToken");
      const response = await axios.post(`orders`, order, {
        headers: {
          "x-client-token": clientToken,
        },
      });
      console.log("response: ", response.data);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, newOrderStatus }, { rejectWithValue }) => {
    try {
      let clientToken = Cookies.get("clientToken");
      const response = await axios.put(`/orders/${id}`, newOrderStatus, {
        headers: {
          "x-client-token": clientToken,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    data: [],
    order: {},
    hostOrders: [],
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
      .addCase(listHostOrders.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(listHostOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.hostOrders = action.payload;
      })
      .addCase(listHostOrders.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        console.log(action.error.message);
      })
      .addCase(createNewOrder.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
        console.log("pending: ", action);

      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        console.log(action.error.message);
      })
      .addCase(updateOrderStatus.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
        const updatedOrders = state.hostOrders.map((order) => {
          if (order._id === action.payload._id) {
            return action.payload;
          } else {
            return order;
          }
        });
        state.hostOrders = updatedOrders;
        state.error = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOrderById.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

    // eslint-disable-next-line no-unused-vars
  },
});

export default orderSlice.reducer;
