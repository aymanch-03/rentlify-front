import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './features/authSlice';

const store = configureStore({
    reducer: {
        customer : customerReducer
        
    }
})

export default store;