import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth/thunks';

export const LoginPage = () => {

    const { status } = useSelector(state => state.auth);

    // Se usa el mismo dispatch para todos los reducers/partes del store
    const dispatch = useDispatch();

    const { email, password, onInputChange } = useForm({
        email: 'ebmsamuel@gmail.com',
        password: '123456'
    });

    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(checkingAuthentication());

        console.log({email, password});
    };

    const onGoogleSignIn = (event) => {
        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout title='Login'>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2}}>
                        <TextField name='email' onChange={onInputChange} value={email} label="Email" type="email" placeholder='email@example.com' fullWidth/>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2}}>
                        <TextField name='password' onChange={onInputChange} value={password} label="Password" type="password" placeholder='*******' fullWidth/>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <Button type='submit' variant='contained' fullWidth disabled={isAuthenticating}>
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
