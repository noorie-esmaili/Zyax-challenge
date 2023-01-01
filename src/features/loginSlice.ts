import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  reload: false,
}

const loginSlice = createSlice({
  name: 'parcels',
  initialState,
  reducers: {
    addParcels: (state, action) => {
      console.log('########>>> ' + state + '>>>>>>' + action.payload)
    },
    updateReload: (state) => {
      state.reload = !state.reload
    },
  },
})

export const { addParcels, updateReload } = loginSlice.actions

export default loginSlice.reducer
