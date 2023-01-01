import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../app/store'
import { fetchCount } from './loginAPI'

export interface LoginState {
  email: string
  password: string
}

const initialState: LoginState = {
  email: '',
  password: '',
}

export const incrementAsync = createAsyncThunk(
  'https://test.zyax.se/access',
  async (amount: number) => {
    const response = await fetchCount(amount)
    console.log(response.data)
    return response.data
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state) => {
      state.email += 1
    },
    setPassword: (state) => {
      state.email += 'a'
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      console.log(action.payload)
      state.email += action.payload
    },
  },
})

export const { incrementByAmount } = loginSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.email

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState())
    if (currentValue !== '') {
      dispatch(incrementByAmount(amount))
    }
  }

export default loginSlice.reducer
