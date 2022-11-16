import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

// Mock de Firebase Providers
jest.mock("../../../src/firebase/providers");

const dispatch = jest.fn();
beforeEach(() => jest.clearAllMocks());

describe('Pruebas en Auth Thunks', () => { 
    test('Debe invocar el checkingCredentials', async() => { 
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkCredentials());
    });

    test('startGoogleSignIn debe ser exitoso', async() => { 
        const loginData = { ok: true, user: demoUser };
        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSignIn debe ser fallido', async() => { 
        const errorData = { ok: false, errorMessage: "Error en Google" };
        await signInWithGoogle.mockResolvedValue(errorData);
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(errorData));
    });

    test('startLoginWithEmailPassword debe ser exitoso', async() => {
        const loginData = {ok: true, ...demoUser};
        const formData = {email: demoUser.email, password: '123456'};
        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startLoginWithEmailPassword debe ser fallido', async() => {
        const loginData = {ok: false, errorMessage: "Error en Login" };
        const formData = {email: demoUser.email, password: '123456'};
        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));
    });

    test('startLogout debe llamar logoutFirebase, clearNotes y logout', async() => {
        await startLogout()(dispatch);
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });
});