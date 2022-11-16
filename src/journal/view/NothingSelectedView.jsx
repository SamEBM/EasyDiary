import { NoteAdd } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import React from 'react'

export const NothingSelectedView = () => {
    return (
        <Grid container 
            spacing={0} 
            direction="column" 
            alignItems="center" 
            justifyContent="center" 
            className='animate__animated animate__slideInDown'
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3}}
        >
                <Grid item xs={12}>
                    <NoteAdd sx={{ fontSize: 80, color: 'white' }}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="white" variant='h5'>Select an existing note or create a new one</Typography>
                </Grid>
        </Grid>
    )
}
