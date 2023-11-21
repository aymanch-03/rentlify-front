import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authSlice";
import customerReducer from "./reducers/customerSlice";
import orderReducer from "./reducers/orderSlice";
import userReducer from "./reducers/userSlice";
import productReducer from "./reducers/productSlice";
import subcategorieReducer from "./reducers/subcategorieSlice";

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
    products: productReducer,
    subcategories: subcategorieReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;

export const persistor = persistStore(store);
