/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const ListOrders = createAsyncThunk('Order/ListOrders', async (orders) => {
    const request= await axios.get('http://localhost:5000/v1/orders', orders,{withCredentials: true});
    const response = await request.data;
    localStorage.setItem('orders', JSON.stringify(response));
    return response;
    // console.log(response);
})

const ordersSlice = createSlice({
    name: 'Order',
    initialState: {
        orders: []
    },
    // reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ListOrders.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.orders = action.payload;
                console.log('Login Successfully', action.payload)
            })
            .addCase(ListOrders.rejected, (state, action) => {
                state.status = "rejected";
                console.log(action.payload);
            })
    }
})

export default ordersSlice.reducer;