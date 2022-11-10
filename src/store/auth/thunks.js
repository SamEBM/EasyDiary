// Los thunks sirven cuando se tiene que ejecutar una función asíncrona

import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkCredentials());
    } 
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkCredentials());
        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    } 
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkCredentials());
        const result = await registerUserWithEmailPassword({email, password, displayName});
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    } 
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkCredentials());
        const result = await loginWithEmailPassword({email, password});
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    } 
}

export const startLogout = () => {
    return async(dispatch) => {

        await logoutFirebase();
        dispatch(logout());
    }
}