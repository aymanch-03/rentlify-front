import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducers';
import customerlistreducer from '../reducers/listcustomersReducer';
import productsReduser from '../reducers/productsReduser';
import ordersReducer from '../reducers/orderReducer';

const store = configureStore({
    reducer : {
        user : userReducer,
        customers: customerlistreducer,
        products: productsReduser,
        orders: ordersReducer
    }
})

export default store;