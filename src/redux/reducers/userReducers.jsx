/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, { rejectWithValue }) => {
    console.log(user);
    try {
      const request = await axios.post(
        "http://localhost:5000/v1/users/login",
        user,
        { withCredentials: true }
      );
      console.log(request);
      const response = await request.data.user;
      const token = await request.data.accessToken;
      window.localStorage.setItem("token", JSON.stringify(token));
      return response;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
    // console.log(response);
  }
);

const loginSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  // reducers: {},
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
        console.log("Login Successfully", action.payload);
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = true;
        state.status = "rejected";
        state.error = action.error;
        console.error(action);
      });
  },
});

export default loginSlice.reducer;
