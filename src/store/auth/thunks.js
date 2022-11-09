// Los thunks sirven cuando se tiene que ejecutar una función asíncrona

import { signInWithGoogle } from "../../firebase/providers";
import { checkCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkCredentials());
    } 
}

export const startGoogleSignIn = (email, password) => {
    return async(dispatch) => {
        dispatch(checkCredentials());
        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result))
    } 
}