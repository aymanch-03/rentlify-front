/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const LoginUser = createAsyncThunk("user/LoginUser", async (user) => {
  const request = await axios.post(
    "http://localhost:5000/v1/users/login",
    user,
    { withCredentials: true }
  );
  const response = await request.data;
  localStorage.setItem("token", JSON.stringify(request.data.accessToken));
  return response;
  // console.log(response);
});

const loginSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  // reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload;
        console.log("Login Successfully", action.payload);
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.status = "rejected";
        console.log(action.error.message);
      });
  },
});

export default loginSlice.reducer;
