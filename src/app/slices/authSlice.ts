import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "../types/auth";

type AuthState = {
	user: User | null;
	token: string | null;
};

const slice = createSlice({
	name: "auth",
	initialState: { user: null, token: null } as AuthState,
	reducers: {
		setCredentials: (state, { payload: { user, token } }: PayloadAction<{ user: User; token: string }>) => {
			state.user = user;
			state.token = token;
		},
		clearUser: (state) => {
			state.user = null;
			state.token = null;
			localStorage.removeItem("token");
			localStorage.removeItem("user");
		},
	},
});

export const { setCredentials, clearUser } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
