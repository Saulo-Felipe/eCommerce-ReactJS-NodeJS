import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'cart',
    initialState: {
        cartCount: 0,
        cartValue: []
    },
    reducers: {
        changeCartCount(state, action) {
            return { ...state, cartCount: action.payload, cartValue: state.cartValue }
        },
        changeCartValue(state, action) {
            return { ...state, cartCount: state.cartCount, cartValue: state.cartValue }
        }
    }
})

export const { changeCartCount, changeCartValue } = slice.actions

export const selectCart = state => state.cart

export default slice.reducer
