import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducers';
import customerlistreducer from '../reducers/listcustomersReducer';

const store = configureStore({
    reducer : {
        user : userReducer,
        customers: customerlistreducer
    }
})

export default store;