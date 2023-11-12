import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const ListUsers = createAsyncThunk("user/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5000/v1/users");
    // console.log('response : ', response.data.data);
    return response.data.data;
  } catch (error) {
    rejectWithValue(error.response.data)
  }
})

export const getUser = createAsyncThunk("user/getUser", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:5000/v1/users/${id}`)
    // console.log('response: ', response.data.data)
    return response.data.data;
  } catch (error) {
    rejectWithValue(error.response.data)
  }
})

export const addUser = createAsyncThunk("user/addUser", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/v1/users", user)
    return response.data.data;
  } catch (error) {
    rejectWithValue(error.response.data)
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async ({ id, updatedUser }, { rejectWithValue }) => {
  try {
    // console.log("id : ",id)
    // console.log("user : ",updatedUser)
    const response = await axios.put(`http://localhost:5000/v1/users/${id}`, updatedUser)
    console.log("response : ", response.data.data)
    return response.data.data;
  } catch (error) {
    rejectWithValue(error.response.data)
  }
});
export const deleteUser = createAsyncThunk("user/deleteUser", async (id, { rejectWithValue }) => {
  try {
    // console.log("id : ",id)
    const response = await axios.delete(`http://localhost:5000/v1/users/${id}`)
    console.log("response : ", response.data.data)
    return response.data.data;
  } catch (error) {
    rejectWithValue(error.response.data)
  }
});


const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    isLoading: true,
    error: null
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(ListUsers.pending, (state, action) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(ListUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = null
      })
      .addCase(ListUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })
      .addCase(getUser.pending, (state, action) => {
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })
      .addCase(addUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = [...state.users, action.payload];
        state.error = null
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUsers = state.users.map((user) => {
          if (user._id === action.payload._id) {
            return action.payload;
          } else {
            return user
          }
        });
        state.users = updatedUsers;
        console.log("state.users: ", updatedUsers);
        state.error = null
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("action.payload._id ", action.payload._id);
        const Users = state.users.filter(user => user._id !== action.payload._id)
        state.users = Users;
        // console.log("state.users: ", Users);
        state.error = null
      })
  },
});

export default userSlice.reducer;
