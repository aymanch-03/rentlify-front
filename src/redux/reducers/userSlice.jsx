/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const ListUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users");
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/v1/users/${id}`);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/v1/users", user);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, user }, { rejectWithValue }) => {
    try {
      const response = axios.put(`http://localhost:5000/v1/users/${id}`, user);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ListUsers.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ListUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(ListUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state, action) => {
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = [...state.users, action.payload];
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
