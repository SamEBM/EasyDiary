import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider().setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        let message = error.message;

        switch (error.code) {
            case 'auth/popup-closed-by-user':
                message = 'Authentication popup was closed, please try again';
                break;
    
            default:
                break;
        }

        return {
            ok: false,
            errorMessage: message
        }
    }
}
export const registerUserWithEmailPassword = async ({email, password, displayName}) => {
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        
        // Actualizar el displayName en Firebase
        await updateProfile(FirebaseAuth.currentUser, { displayName })

        return {
            ok: true,
            uid: result.user.uid,
            photoURL: result.user.photoURL,
            displayName,
            email,
        }
        
    } catch (error) {
        console.log(error.code);
        let message = error.message;

        switch (error.code) {
            case 'auth/email-already-in-use':
                message = 'An account already exists with the same email';
                break;
    
            default:
                break;
        }

        return {
            ok: false,
            errorMessage: message
        }
    }
}

export const loginWithEmailPassword = async ({email, password}) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        
        return {
            ok: true,
            uid: result.user.uid,
            photoURL: result.user.photoURL,
            displayName: result.user.displayName,
            email,
        }
    } catch (error) {
        let message = error.message;

        switch (error.code) {
            case 'auth/wrong-password':
                message = 'Incorrect password, please try again';
                break;

            case 'auth/user-not-found':
                message = 'This email is not registered, please create an account';
                break;
    
            default:
                break;
        }

        return {
            ok: false,
            errorMessage: message
        }
    }
}