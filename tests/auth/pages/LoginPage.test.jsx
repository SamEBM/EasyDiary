const { configureStore } = require("@reduxjs/toolkit");
const { render, screen, fireEvent } = require("@testing-library/react");
const { Provider } = require("react-redux");
const { MemoryRouter } = require("react-router-dom");
const { LoginPage } = require("../../../src/auth/pages/LoginPage");
const { authSlice } = require("../../../src/store/auth/authSlice");
const { notAuthenticatedState } = require("../../fixtures/authFixtures");

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password})
    }
}));

jest.mock("react-redux", () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer 
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

const dispatch = jest.fn();

describe('Pruebas en <LoginPage/>', () => {
    
    beforeEach(() => jest.clearAllMocks());

    test('Debe mostrar el componente correctamente', () => { 
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );
        // Ver lo que se genera:
        // screen.debug();
        
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('Boton de Google debe llamar el startGoogleLogin', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);

        expect(mockStartGoogleSignIn).toHaveBeenCalled();
    });

    test('Submit debe llamar startLoginWithEmailPassword', () => {
        const email = 'samuelebm@hotmail.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Email' });
        fireEvent.change(emailField, { target: { name: 'email', value: email } });
        
        // El textfield de tipo password no se obtiene de la misma manera
        // Se tuvo que agregar un test-id al componente de MUI
        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } });
        
        const loginForm = screen.getByLabelText('login-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email, password
        });
    });
})