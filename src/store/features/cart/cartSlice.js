import { createSlice } from "@reduxjs/toolkit";
import { showSuccessToast, showWarningToast } from "../../../utils/toast";

const initialState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.cartItems.push(action.payload);
        showSuccessToast("Item added to cart");
      } else {
        showWarningToast("Item already added to cart");
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, emptyCart, updateCartItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
