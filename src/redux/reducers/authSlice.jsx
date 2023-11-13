/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "../axios";

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, { rejectWithValue }) => {
    try {
      const request = await axios.post("/users/login", user, {
        withCredentials: true,
      });
      const response = await request.data.user;
      return response;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
    // console.log(response);
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    updateUserInAuthSlice: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state, action) => {
        state.isLoading = true;
        state.user = [];
        state.status = "pending";
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "fulfilled";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "rejected";
        state.error = action.error;
        console.error(action);
      });
  },
});
export const { updateUserInAuthSlice } = authSlice.actions;
export default authSlice.reducer;
