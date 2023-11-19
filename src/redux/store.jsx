import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authCustomerSlice from "./reducers/authCustomerSlice";
import authReducer from "./reducers/authSlice";
import customerReducer from "./reducers/customerSlice";
import orderReducer from "./reducers/orderSlice";
import userReducer from "./reducers/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, authReducer);
// const cartPersistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    auth: userPersistedReducer,
    user: userReducer,
    customers: customerReducer,
    orders: orderReducer,
    authCustomer: authCustomerSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;

export const persistor = persistStore(store);
