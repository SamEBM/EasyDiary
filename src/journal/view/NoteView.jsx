import { AddPhotoAlternate, DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal/thunks'
import { ImageGallery } from '../components'

export const NoteView = () => {

    const dispatch = useDispatch();
    const {active: note, messageSaved, isSaving} = useSelector(state => state.journal);
    const {title, body, date, onInputChange, formState} = useForm(note);
    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toDateString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0){
            Swal.fire('Note updated', messageSaved, 'success');
        }
    }, [messageSaved])
    
    const onSaveNote = (note) => {
        dispatch(startSavingNote());
    };

    const onFileInputChange = (event) => {
        if (event.target.files.length === 0) return;
        dispatch(startUploadingFiles(event.target.files));
    };

    const onDelete = () => {
        dispatch(startDeletingNote());
    };

    return (
        <Grid container className='animate__animated animate__slideInLeft' direction="row" justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>
            <Grid item>

                <input type='file' multiple 
                    onChange={onFileInputChange} 
                    ref={fileInputRef}
                    style={{display: 'none'}} 
                />

                <Button onClick={() => fileInputRef.current.click()} color='primary' disabled={isSaving}>
                    <AddPhotoAlternate sx={{ fontSize:30, mr: 1 }}/>
                    Add images
                </Button>

                <Button onClick={onSaveNote} color='primary' sx={{ padding: 2 }} disabled={isSaving}>
                    <SaveOutlined sx={{ fontSize:30, mr: 1 }}/>
                    Save
                </Button>
            </Grid>
            <Grid container>
                <TextField name="title" value={title} onChange={onInputChange} type="text" variant="filled" fullWidth placeholder="Enter a title" label="Title" sx={{ border: 'none', mb: 1 }} />
                <TextField name="body" value={body} onChange={onInputChange} type="text" variant="filled" fullWidth multiline label="What happened today?" placeholder="Enter a note" minRows={5}/>
            </Grid>

            <Grid container justifyContent="end">
                <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
                    <DeleteOutline />
                    Delete
                </Button>
            </Grid>

            <ImageGallery images={note.imageUrls}/>
        </Grid>
    )
}
