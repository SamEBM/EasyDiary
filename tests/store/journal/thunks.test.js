import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe('Pruebas en Journal Thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('startNewNote debe crear una nueva nota en blanco', async() => {
        getState.mockReturnValue({ auth: {uid: 'TEST-UID'}});
        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: 'New note',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: []
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: 'New note',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: []
        }));

        // Borrar notas de Firebase
        const collectionRef = collection(FirebaseDB, `TEST-UID/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
        await Promise.all(deletePromises);
    });
});