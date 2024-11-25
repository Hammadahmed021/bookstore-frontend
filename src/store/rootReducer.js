import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import booksApi from "./features/books/booksApi";
import authApi from "./features/users/usersApi";
import authSlice from "./features/users/userSlice";

const rootReducer = combineReducers({
  cart: cartSlice, // This is persisted
  auth: authSlice,
  [booksApi.reducerPath]: booksApi.reducer, // RTK Query reducer
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
