import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'cart',
    initialState: {
        cartCount: 0,
        cartValue: [],
        totalPrice: 0
    },
    reducers: {
        changeCartCount(state, action) {
            return { ...state, cartCount: action.payload, cartValue: state.cartValue }
        },
        changeCartValue(state, action) {
            return { ...state, cartCount: state.cartCount, cartValue: action.payload}
        },
        changePrice(state, action) {
            return { ...state, cartCount: state.cartCount, cartValue: state.cartValue, totalPrice: action.payload }
        }
    }
})

export const { changeCartCount, changeCartValue, changePrice } = slice.actions

export const selectCart = state => state.cart

export default slice.reducer
