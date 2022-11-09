import { IconButton, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import React from 'react';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../view';

export const JournalPage = () => {
    return (
        <JournalLayout>
            {/* <Typography>Anim non sunt sint sit officia qui. Exercitation nisi nisi aliquip dolor ut. Exercitation magna ad quis tempor tempor id excepteur cillum ut occaecat eiusmod. Enim mollit sit elit proident cupidatat aute aute dolor laborum. Dolore quis aliquip non enim nulla laborum officia fugiat nulla et magna sint do non.</Typography> */}
            <NothingSelectedView />
            {/* <NoteView /> */}

            <IconButton size='large' 
                sx={{ 
                    color: 'white', 
                    backgroundColor: 'error.main', 
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 }, 
                    position: 'fixed', 
                    right: 50, 
                    bottom: 50 
                }}>

                <AddOutlined sx={{ fontSize: 30 }}/>
            </IconButton>
        </JournalLayout>
    )
}
