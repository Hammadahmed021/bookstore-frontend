import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import booksApi from "./features/books/booksApi";
import authApi from "./features/users/usersApi";
import authSlice from "./features/users/userSlice";
import ordersApi from "./features/orders/orderApi";
import categoriesApi from "./features/categories/categoryApi";

const rootReducer = combineReducers({
  cart: cartSlice, // This is persisted
  auth: authSlice,
  [booksApi.reducerPath]: booksApi.reducer, // RTK Query reducer
  [authApi.reducerPath]: authApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
});

export default rootReducer;
