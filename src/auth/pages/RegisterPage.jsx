import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import React from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { Google } from '@mui/icons-material';

export const RegisterPage = () => {
    return (
        <AuthLayout title='Create Account'>
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2}}>
                        <TextField label="Name" type="text" placeholder='Your name' fullWidth/>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2}}>
                        <TextField label="Email" type="email" placeholder='email@example.com' fullWidth/>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2}}>
                        <TextField label="Password" type="password" placeholder='*******' fullWidth/>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <Button variant='contained' fullWidth>
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
