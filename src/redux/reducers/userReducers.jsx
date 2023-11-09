/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const LoginUser = createAsyncThunk('user/LoginUser', async (user) => {
    const request= await axios.post('http://localhost:5000/v1/users/login', user,{withCredentials: true});
    const response = await request.data.user;
    localStorage.setItem('user', JSON.stringify(response));
    return response;
    // console.log(response);
})

const loginSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    // reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.user = action.payload;
                console.log('Login Successfully', action.payload)
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.status = "rejected";
                console.log(action.error.message);
            })
    }
})

export default loginSlice.reducer;