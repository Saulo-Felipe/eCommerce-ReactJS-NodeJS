import { configureStore } from '@reduxjs/toolkit'
import likeReducer from './slices/likeSlice'
import cartReducer from './slices/cartSlice'
import checkoutSlice from './slices/checkoutSlice'

export default configureStore({
    reducer: {
        like: likeReducer,
        cart: cartReducer,
        checkout: checkoutSlice,
    }
})