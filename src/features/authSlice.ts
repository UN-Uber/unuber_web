import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const user = localStorage.getItem("token");

interface AuthState {
    user : string | null;
    isLoggedIn : boolean;
}

const initialState: AuthState = user
    ? { user: user, isLoggedIn: true }
    : { user: null, isLoggedIn: false };

interface LoginPayload {
    user: string
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSucess: (state, action: PayloadAction<LoginPayload>) => {
            state.user = action.payload.user;
            state.isLoggedIn = true;
        },
        loginFail: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        }
    },
});

export const { loginSucess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;