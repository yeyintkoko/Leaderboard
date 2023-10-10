import { retrieveSecureData, storeSecureData } from "../utilities/encryptedStore";
import { noteType, notesType } from "../utilities/types";

const KEY_NOTES_LIST = 'KEY_NOTES_LIST';

export const getData = async () => {
    const data = await retrieveSecureData(KEY_NOTES_LIST);
    return data;
};

export const saveData = async (note: noteType) => {
    let data: notesType = await getData();
    const editedNote = data.find(it => it.id === note.id);
    if (editedNote) {
        editedNote.note = note.note;
        editedNote.title = note.title;
    } else {
        data = [note, ...data]
    }
    storeSecureData(KEY_NOTES_LIST, data);
};

export const saveList = (notes: notesType) => {
    storeSecureData(KEY_NOTES_LIST, notes);
}