import { Avatar, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { stringAvatar } from '../../helpers/avatar'
import { SideBarItem } from './SideBarItem'

export const SideBar = ({drawerWidth = 240}) => {

    const {displayName, photoURL} = useSelector(state => state.auth);
    const {notes} = useSelector(state => state.journal);

    return (
        <Box component='nav' sx={{ width: { sm: drawerWidth}, flexShrink: { sm: 0 }}}>
            <Drawer variant='permanent' open sx={{ display: { xs: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
                <Toolbar>
                    {photoURL ? <></> : <Avatar {...stringAvatar(displayName)} />}
                    <Typography variant='h6' noWrap component='div' sx={{ml: 1}}>{displayName}</Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map( note => (
                            <SideBarItem key={note.id} note={note}/>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}
