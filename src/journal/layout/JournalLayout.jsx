import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import { NavBar, SideBar } from '../components';

const drawerWidth = 300;

export const JournalLayout = ({children}) => {
    return (
        <Box  sx={{ display: 'flex', height: '100vh' }} className='animate__animated animate__fadeInUp'>
            <NavBar drawerWidth={drawerWidth}/>

            <SideBar drawerWidth={drawerWidth}/>

            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {children}
            </Box>
        </Box>
    )
}
