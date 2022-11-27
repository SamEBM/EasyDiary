import { Avatar, Button, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stringAvatar } from '../../helpers/avatar'
import { startNewNote } from '../../store/journal/thunks'
import { SideBarItem } from './SideBarItem'

export const SideBar = ({drawerWidth = 240}) => {

    const {displayName, photoURL} = useSelector(state => state.auth);
    const {notes} = useSelector(state => state.journal);

    const dispatch = useDispatch();
    const onClickNewNote = () => {
        dispatch(startNewNote());
    };

    return (
        <Box component='nav' sx={{ width: { sm: drawerWidth}, flexShrink: { sm: 0 }}}>
            <Drawer variant='permanent' open sx={{ display: { xs: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
                <Toolbar>
                    {photoURL !== null ? <Avatar src={photoURL} alt='avatar'/> : (displayName !== null ? <Avatar {...stringAvatar(displayName)}/> : <></>)}
                    <Typography variant='h6' noWrap component='div' sx={{ml: 1}}>{displayName}</Typography>
                </Toolbar>
                <Divider />
                <Button onClick={onClickNewNote} color='primary' variant="outlined" sx={{ m: 2 }}>Add new note</Button>
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
