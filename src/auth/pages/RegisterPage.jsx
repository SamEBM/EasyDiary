import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import React, { useMemo, useState } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm';
import { checkingAuthentication, startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';

const emailExp = new RegExp('^[^@]+@[^@]+\.[a-zA-Z]{2,}$');

const formValidations = {
    email: [(value) => emailExp.test(value), 'Enter a valid email address'], 
    password: [(value) => value.length >= 6, 'Password must have at least 6 characters'],
    displayName: [(value) => value.length >= 2, 'Name must be at least 2 characters'],
};

export const RegisterPage = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { formState, displayName, email, password, isFormValid, displayNameValid, emailValid, passwordValid, onInputChange } = useForm({
        displayName: '',
        email: '',
        password: ''
    }, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(checkingAuthentication());
        setFormSubmitted(true);
        dispatch(startCreatingUserWithEmailPassword(formState));
    };

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    return (
        <AuthLayout title='Create Account'>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2}}>
                        <TextField name='displayName' 
                            onChange={onInputChange} 
                            value={displayName} 
                            label="Name" 
                            type="text" 
                            placeholder='Your name' 
                            fullWidth
                            error={ !!displayNameValid && formSubmitted }
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2}}>
                        <TextField name='email' 
                            onChange={onInputChange} 
                            value={email} label="Email" 
                            type="email" 
                            placeholder='email@example.com' 
                            fullWidth
                            error={ !!emailValid && formSubmitted }
                            helperText={emailValid}
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
                            helperText={passwordValid}
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
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='center'>
                        <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
                        <Link component={RouterLink} color='inherit' to="/auth/login">Login</Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}
