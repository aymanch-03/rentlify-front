import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authCustomerReducer from "./reducers/authCustomerSlice";
import authReducer from "./reducers/authSlice";
import categoryReducer from "./reducers/categorySlice";
import customerReducer from "./reducers/customerSlice";
import listingReducer from "./reducers/listingSlice";
import orderReducer from "./reducers/orderSlice";
import subcategorieReducer from "./reducers/subcategorieSlice";
import userReducer from "./reducers/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, authReducer);
const customerPersistedReducer = persistReducer(
  persistConfig,
  authCustomerReducer
);
// const cartPersistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    auth: userPersistedReducer,
    user: userReducer,
    customers: customerReducer,
    orders: orderReducer,
    categories: categoryReducer,
    authCustomer: customerPersistedReducer,
    listings: listingReducer,
    subcategories: subcategorieReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;

export const persistor = persistStore(store);
