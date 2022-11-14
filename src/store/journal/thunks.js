import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const {uid} = getState().auth;

        const newNote = {
            title: 'New note',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        };

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        const resp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        const {uid} = getState().auth;
        const {active: note} = getState().journal;
        const newNote = {...note};
        delete newNote.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, newNote, { merge: true });

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const imageURLs = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(imageURLs));
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}