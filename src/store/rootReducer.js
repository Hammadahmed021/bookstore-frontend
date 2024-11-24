import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import booksApi from "./features/books/booksApi";

const rootReducer = combineReducers({
  cart: cartSlice, // This is persisted
  [booksApi.reducerPath]: booksApi.reducer, // RTK Query reducer
});

export default rootReducer;
