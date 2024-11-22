// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";

const rootReducer = combineReducers({
  cart: cartSlice,
});

export default rootReducer;
