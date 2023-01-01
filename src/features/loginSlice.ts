import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: '',
}

const loginSlice = createSlice({
  name: 'loggin',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.status = action.type
    },
  },
})

export const { userLoggedIn } = loginSlice.actions

export default loginSlice.reducer
