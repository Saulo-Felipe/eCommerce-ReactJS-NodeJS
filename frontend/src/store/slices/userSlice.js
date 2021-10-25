import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'user',
  initialState: { 
    isLogged: false 
  },
  reducers: {
    newUser(state, action) {
      console.log("PAYLOAD: ", action.payload)
      return {
        ...state,
      }
    }
  }
})

export const { newUser } = slice.actions

export const selectUser = state => state.like

export default slice.reducer

