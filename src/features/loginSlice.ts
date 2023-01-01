import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  parcels: [],
  reload: false,
}

const loginSlice = createSlice({
  name: 'parcels',
  initialState,
  reducers: {
    getParcels: (state, { payload }) => {
      console.log(payload)
      state.parcels = payload
    },
    addParcels: (state, action) => {
      console.log(state.parcels.push(action.payload))
      console.log('########>>> ' + action.payload)
    },
    updateReload: (state) => {
      state.reload = !state.reload
    },
  },
})

export const { getParcels, addParcels, updateReload } = loginSlice.actions
export const getAllParcels = (state) => {
  return state.parcels.parcels
}
export default loginSlice.reducer
