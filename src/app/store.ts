import { configureStore } from "@reduxjs/toolkit";
import { dishesApi } from "./api/dishesApi";
import { authApi } from "./api/authApi";
import authReducer from "./slices/authSlice";
const store = configureStore({
	reducer: {
		[dishesApi.reducerPath]: dishesApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dishesApi.middleware).concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
