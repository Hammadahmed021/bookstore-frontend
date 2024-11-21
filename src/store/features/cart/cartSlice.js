import { createSlice } from "@reduxjs/toolkit";
import { showSuccessToast, showWarningToast } from "../../../utils/toast";

const initialState = {
    cartItems: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id)
            if(!existingItem){
                state.cartItems.push(action.payload)
                showSuccessToast("Item added to cart")
            }else{
                showWarningToast("Item already added to cart")

            }
        }
    }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;