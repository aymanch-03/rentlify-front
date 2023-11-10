import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "./reducers/userReducers";
import customerlistreducer from "./reducers/listcustomersReducer";
import productsReduser from "./reducers/productsReduser";
import ordersReducer from "./reducers/orderReducer";

const persistConfig = {
  key: "root",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userReducer);
// const cartPersistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    customers: customerlistreducer,
    products: productsReduser,
    orders: ordersReducer,
    // cart: cartPersistedReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;

export const persistor = persistStore(store);
