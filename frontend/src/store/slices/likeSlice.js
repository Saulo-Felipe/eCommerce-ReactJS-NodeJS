import { createSlice } from '@reduxjs/toolkit'


const slice = createSlice({
    name: 'like',
    initialState: {
        likeCount: 0,
    },
    reducers: {
        changeLikeCount(state, action) {
            return { ...state, likeCount: action.payload }
        }
    }  
})

export const { changeLikeCount } = slice.actions

export const selectLike = state => state.like

export default slice.reducer
