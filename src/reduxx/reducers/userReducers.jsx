import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const addUser = createAsyncThunk('user/addUser', async (user) => {
    return axios
        .post('http://localhost:5000/v1/users', user)
        .then(res => res.data)
        .catch((err) => err);
})

export const updateUser = createAsyncThunk('user/updateUser',async(id,user) => {
    return axios
    .put(`http://localhost:5000/v1/users/${id}`, user)
        .then(res => res.data)
        .catch((err) => err);
})

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state, action) => {
                state.status = "pending";
                console.log('Adding New User')

            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = "fulfilled";
                console.log('User Added Successfully', action.payload)
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = "rejected";
                console.log('Cannot dd Used')

            })
    }
})

export default userSlice.reducer;