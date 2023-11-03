import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const addUser = createAsyncThunk('user/addUser',async (user)=> {
    return axios
        .post('http://localhost:5000/v1/users', user)
        .then(console.log(res.data))
        .catch((err)=> err);
    }) 

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users :[]
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(addUser.pending,(state,action)=>{
            state.status="pending";
            console.log('User Added Successfully')
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.status="fulfilled";
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.status="rejected";
        })
    }
})

export default userSlice.reducer;