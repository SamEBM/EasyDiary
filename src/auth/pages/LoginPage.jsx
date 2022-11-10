import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';

const emailExp = new RegExp('^[^@]+@[^@]+\.[a-zA-Z]{2,}$');

const formValidations = {
    email: [(value) => emailExp.test(value), 'Enter a valid email address'], 
    password: [(value) => value.length >= 6, 'Password must have at least 6 characters'],
};

export const LoginPage = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { formState, email, password, isFormValid, emailValid, passwordValid, onInputChange } = useForm({
        email: '',
        password: ''
    }, formValidations);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        dispatch(startLoginWithEmailPassword({email, password}));
    };

    const onGoogleSignIn = (event) => {
        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout title='Login'>
            <form className='animate__animated animate__fadeIn' onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2}}>
                        <TextField name='email' 
                            onChange={onInputChange} 
                            value={email} 
                            label="Email" 
                            type="email" 
                            placeholder='email@example.com' 
                            fullWidth
                            error={ !!emailValid && formSubmitted }
                            helperText={formSubmitted ? emailValid : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2}}>
                        <TextField name='password' 
                            onChange={onInputChange} 
                            value={password} 
                            label="Password" 
                            type="password" 
                            placeholder='*******' 
                            fullWidth
                            error={ !!passwordValid && formSubmitted }
                            helperText={formSubmitted ? passwordValid : ''}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} display={!!errorMessage ? '': 'none'}>
                            <Alert severity='error'>
                                {errorMessage}
                            </Alert>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button type='submit' variant='contained' fullWidth disabled={isAuthenticating || !isFormValid}>
                                <Typography>Login</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button onClick={onGoogleSignIn} variant='contained' fullWidth disabled={isAuthenticating}>
                                <Google/>
                                <Typography sx={{ml: 1}}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='center'>
                        <Link component={RouterLink} color='inherit' to="/auth/register">Create an account</Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}
