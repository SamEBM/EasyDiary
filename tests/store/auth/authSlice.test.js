import { authSlice, checkCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => { 
    test('Debe regresar el estado inicial y llamarse "auth"', () => { 
        const state = authSlice.reducer(initialState, {});
        expect(authSlice.name).toBe('auth'); // Verificar que no le hayan cambiado el nommbre
        expect(state).toEqual(initialState); // Verifica el estado inicial
    });

    test('Debe realizar la autenticación', () => { 
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });

    test('Debe realizar el logout sin error', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    test('Debe realizar el logout con error', () => {
        const errorMessage = "Credenciales no son correctas";
        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage
        });
    });

    test('Debe cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkCredentials());
        expect(state.status).toBe('checking');
    });
})