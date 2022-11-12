import { IconButton, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import React from 'react';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../view';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {

    const {isSaving, active} = useSelector(state => state.journal);

    const dispatch = useDispatch();

    const onClickNewNote = () => {
        dispatch(startNewNote());
    };

    return (
        <JournalLayout>
            {
                active ? <NoteView /> : <NothingSelectedView />
            }

            <IconButton size='large'
                onClick={onClickNewNote}
                disabled={isSaving}
                sx={{ 
                    color: 'white', 
                    backgroundColor: 'secondary.main', 
                    ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 }, 
                    position: 'fixed', 
                    right: 50, 
                    bottom: 50 
                }}>

                <AddOutlined sx={{ fontSize: 30 }}/>
            </IconButton>
        </JournalLayout>
    )
}
