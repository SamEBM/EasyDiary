import { LightbulbCircle, LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { startLogout } from '../../store/auth/thunks'

export const NavBar = ({drawerWidth = 240}) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout());
    };

    const onHelp = () => {
        Swal.fire(
            'How it works?',
            'Easy Diary helps you to keep track of your daily ideas offering you a simple way to manage notes. You can write, edit and add images to every note. Go ahead and click the "+" button and give it a try.',
            'question'
        );
    };

    return (
        <AppBar position='fixed' 
            sx={{ 
                width: { sm: `calc(100% - ${drawerWidth}px)`},
                ml: { sm: `${drawerWidth}px)`},
            }}>
            <Toolbar>
                <IconButton color='inherit' edge="start" sx={{mr:2, display: {sm:'none'}}}>
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent="space-between" alignItems='center'>
                    <Grid item>
                        <Typography variant='h6' noWrap component='div'>My Notes</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={onHelp} color='light' sx={{ mr: 2 }}>
                            <LightbulbCircle sx={{ mr: 1 }} />
                            How it works?
                        </Button>
                        <IconButton onClick={onLogout} color='light'>
                            <LogoutOutlined />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
