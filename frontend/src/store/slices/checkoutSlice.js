import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
  name: 'checkout',
  initialState: {
    address: {
      firstName: '',
      secondName: '',
      email: '',
      address: '',
      state: '',
      phoneNumber: '',
      city: '',
      cep: '',
      secondAddress: '',
      country: ''
    }
  },
  reducers: {
    changeAddress(state, action) {
      return { ...state, address: action.payload }
    } 
  }
})



export const { changeAddress } = slice.actions

export const selectAddress = state => state.checkout

export default slice.reducer