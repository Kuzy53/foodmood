import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {SLICE_BASE_NAME} from './constants'
import {useNavigate} from "react-router-dom";

export interface SessionState {
  user: any
}

const initialState: SessionState = {
  user: null,
}

const sessionSlice = createSlice({
  name: `${SLICE_BASE_NAME}/session`,
  initialState,
  reducers: {
    signInSuccess(state, payload: any) {
      state.user = payload
    },
    signOutSuccess(state) {
      state.user = null
    },
    updateSession(state, action: PayloadAction<{ token: string, expireTime: number, refreshToken: string }>) {
      // state.signedIn = true
    },
  },
})

export const {signInSuccess, signOutSuccess,updateSession} = sessionSlice.actions
export default sessionSlice.reducer
