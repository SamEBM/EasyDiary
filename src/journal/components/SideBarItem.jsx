import { Edit } from '@mui/icons-material'
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({note}) => {

    const newTitle = useMemo(() => {
        return note.title.length > 17 ? note.title.substring(0,17) + '...' : note.title;
    }, [note.title]);

    const {active} = useSelector(state => state.journal);

    const dateString = useMemo(() => {
        const newDate = new Date(note.date);
        return newDate.toDateString();
    }, [active]);

    const dispatch = useDispatch();

    const onActiveNote = () => {
        dispatch(setActiveNote(note));
    };

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onActiveNote}>
                <ListItemIcon>
                    <Edit color='secondary'/>
                </ListItemIcon>
                <Typography component="div">
                    <Box sx={{color: 'primary', fontWeight: 'bold'}}>{newTitle}</Box>
                    <Typography variant="overline">{dateString}</Typography>
                    <ListItemText secondary={note.body} />
                </Typography>
            </ListItemButton>
        </ListItem>
    )
}
