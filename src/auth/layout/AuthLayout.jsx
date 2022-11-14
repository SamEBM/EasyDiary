import { MenuBookRounded } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export const AuthLayout = ({children, title=""}) => {
    return (
        <Grid container
            spacing={0} 
            direction="column" 
            alignItems="center" 
            justifyContent="center" 
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
                <Grid item
                    className='box-shadow'
                    xs={3}
                    sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, width: {md: '450px'} }}
                >
                    <div className='animate__animated animate__jackInTheBox'>
                        <Typography textAlign='center' variant='h4' sx={{mb: 1}}>
                            <b> Easy Diary </b>
                        </Typography>
                        <Typography textAlign='center'>
                            <Box alignSelf="center"
                                component="img"
                                sx={{
                                    height: 300,
                                    width: 300,
                                }}
                                alt="Journal"
                                src="/logo.png"
                            />
                        </Typography>
                        <Typography textAlign='center' variant="overline" display="block" gutterBottom>
                            Keep track of your thoughts
                        </Typography>
                    </div>

                    <Typography variant='h5' sx={{mb: 1, mt: 4}}>{title}</Typography>

                    {children}

                </Grid>
        </Grid>
    )
}
