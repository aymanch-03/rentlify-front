/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../axios";
let userToken;
export const ListUsers = createAsyncThunk("user/getUsers", async () => {
  try {
    userToken = Cookies.get("userToken");
    const response = await axios.get("/users", {
      headers: { "x-user-token": userToken },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const getUser = createAsyncThunk("user/getUser",async (id, { rejectWithValue }) => {
    try {
      userToken = Cookies.get("userToken");
      console.log(id);
      const response = await axios.get(`http://localhost:5000/v1/users/${id}`, {
        headers: {
          "x-user-token": userToken,
        },
      });
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk("user/addUser",async (user, { rejectWithValue }) => {
    try {
      userToken = Cookies.get("userToken");
      const response = await axios.post("http://localhost:5000/v1/users",user,{
          headers: {
            "x-user-token": userToken,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk("user/updateUser",async ({ id, newUserData }, { rejectWithValue }) => {
    try {
      userToken = Cookies.get("userToken");
      const response = await axios.put(`/users/${id}`, newUserData, {
        headers: {
          "x-user-token": userToken,
        },
      });
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser",async (id, { rejectWithValue }) => {
    try {
      userToken = Cookies.get("userToken");
      const response = await axios.delete(`/users/${id}`, {
        headers: {
          "x-user-token": userToken,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    updateUsersInUserSlice: (state, action) => {
      state.users = { ...state.users, ...action.payload };
      console.log(state.users);
    },
  },
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
      }) // Getting one user
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
      }) // Add one user
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
      }) // Update user
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        const updatedUsers = state.users.map((user) => {
          if (user._id === action.payload._id) {
            return action.payload;
          } else {
            return user;
          }
        });
        state.users = updatedUsers;
        state.error = null;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
        console.log(users);
        state.users = users;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
export const { updateUsersInUserSlice } = userSlice.actions;
