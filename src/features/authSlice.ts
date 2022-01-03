import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const user = localStorage.getItem("token")||"";

interface AuthState {
	user: string | null;
	isLoggedIn: boolean;
    id: number;
}

interface Token {
    id: number;
    user: string;
    iat: number;
    exp: number;
}

function checkIfExpired(token:string){
    if(token === ""){
        return true;
    }
    const decoded:Token = jwt_decode<Token>(token);
    if(decoded.exp <Date.now()/1000){
        localStorage.removeItem("token");
        return true;
    }
    return false;
}

const initialState: AuthState = !checkIfExpired(user)
	? { user: user, isLoggedIn: true, id: jwt_decode<Token>(user).id }
	: { user: null, isLoggedIn: false, id: -1 };

interface LoginPayload {
	user: string;
}

export const authSlice = createSlice({
	name: "auth",
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
		},
	},
});

export const { loginSucess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;
