import { configureStore } from '@reduxjs/toolkit'
import likeReducer from './slices/likeSlice'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'

export default configureStore({
    reducer: {
        like: likeReducer,
        cart: cartReducer,
        user: userReducer,
    }
})