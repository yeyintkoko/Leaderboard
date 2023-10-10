/**
 * SecureNote React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {noteType, notesType} from './utilities/types';
import {getData, saveData, saveList} from './controllers/notes';
import Editor from './components/Editor';
import NoteList from './components/NoteList';

const Main = (): JSX.Element => {
    const [notes, setNotes] = useState<notesType>([
        {
            id: 1,
            title: 'Step One',
            note: 'Edit App.tsx to change this screen and then come back to see your edits.',
        },
        {
            id: 2,
            title: 'Step Two',
            note: 'Edit App.tsx to change this screen and then come back to see your edits.',
        },
        {
            id: 3,
            title: 'Step Three',
            note: 'Edit App.tsx to change this screen and then come back to see your edits.',
        },
    ]);
    const [selectedNote, setSelectedNote] = useState<noteType>();
    const [showEditor, setShowEditor] = useState(false);
    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
        getStoredData();
    }, []);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const getStoredData = async () => {
        const data = await getData();
        if (data) {
            setNotes(data);
        } else {
            saveList(notes);
        }
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            {showEditor && (
                <Editor
                    selectedNote={selectedNote}
                    onClose={() => {
                        setShowEditor(false);
                    }}
                    onSave={async note => {
                        await saveData(note);
                        getStoredData();
                        setShowEditor(false);
                    }}
                />
            )}
            {!showEditor && (
                <NoteList
                    notes={notes}
                    onCreatePress={() => {
                        setSelectedNote(undefined);
                        setShowEditor(true);
                    }}
                    onItemPress={note => {
                        setSelectedNote(note);
                        setShowEditor(true);
                    }}
                />
            )}
        </SafeAreaView>
    );
};

export default Main;
