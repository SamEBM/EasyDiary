import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({note}) => {

    const newTitle = useMemo(() => {
        return note.title.length > 17 ? note.title.substring(0,17) + '...' : note.title;
    }, [note.title]);

    const dispatch = useDispatch();

    const onActiveNote = () => {
        dispatch(setActiveNote(note));
    };

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onActiveNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={note.body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
