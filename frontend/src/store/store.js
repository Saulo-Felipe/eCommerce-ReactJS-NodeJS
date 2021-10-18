import { configureStore } from '@reduxjs/toolkit'
import likeReducer from './slices/likeSlice'
import cartReducer from './slices/cartSlice'

export default configureStore({
    reducer: {
        like: likeReducer,
        cart: cartReducer,
    }
})