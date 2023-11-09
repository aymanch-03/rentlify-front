import { configureStore } from "@reduxjs/toolkit";
import customerlistreducer from "../reducers/listcustomersReducer";
import userLoginReducer from "../reducers/userLoginReducer";
import userReducer from "../reducers/userSlice";

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    user: userReducer,
    customers: customerlistreducer,
  },
});

export default store;
