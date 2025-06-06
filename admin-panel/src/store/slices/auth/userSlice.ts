import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export interface UserState {
  user: any | null;
}

const initialState: UserState = {
  user: null
}

const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: any) {
      state.user = action.payload
    },
    removeUser(state){
      console.log('1',state.user)
      state.user = null
      console.log('2',state.user)
    }
  },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer