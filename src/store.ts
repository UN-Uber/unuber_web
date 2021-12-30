import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice,
	},
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectToken = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;