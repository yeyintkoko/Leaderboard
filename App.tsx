/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
    clearStorage,
    retrieveSecureData,
    storeSecureData,
} from './encryptedStore';

const KEY_NOTES_LIST = 'KEY_NOTES_LIST';

type SectionProps = PropsWithChildren<{
    note: noteType;
    onPress: (node: noteType) => void;
}>;

type HeaderProps = {
    title: string;
};

const Header = ({title}: HeaderProps): JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <Text
            style={[
                styles.header,
                {
                    color: isDarkMode ? Colors.white : Colors.black,
                },
            ]}>
            {title}
        </Text>
    );
};

const Section = ({note, onPress}: SectionProps): JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.sectionContainer}
            onPress={() => onPress(note)}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {note.title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {note.note}
            </Text>
        </TouchableOpacity>
    );
};

interface EditorProps {
    selectedNote?: noteType;
    onSave: (note: noteType) => void;
    onClose: () => void;
}

const Editor = ({onSave, onClose, selectedNote}: EditorProps) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [title, setTitle] = useState(selectedNote?.title);
    const [note, setNote] = useState(selectedNote?.note);
    const refNote = useRef<TextInput>(null);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <View style={[styles.editor, backgroundStyle]}>
            <View style={styles.navBar}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={onClose}
                    style={styles.navButton}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        if (title && note) {
                            onSave({
                                id: selectedNote?.id || Date.now(),
                                title: title,
                                note: note,
                            });
                        }
                    }}
                    style={styles.navButton}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.inputTitle}
                value={title}
                onChangeText={setTitle}
                onEndEditing={() => {
                    refNote.current?.focus();
                }}
            />
            <TextInput
                ref={refNote}
                style={styles.inputNote}
                multiline
                numberOfLines={15}
                underlineColorAndroid="transparent"
                textAlignVertical="top"
                value={note}
                onChangeText={setNote}
            />
        </View>
    );
};

type noteType = {
    id: number;
    title: string;
    note: string;
};

type notesType = noteType[];

const App = (): JSX.Element => {
    const [notes, setNotes] = useState<notesType>([
        {
            id: 1,
            title: 'Step One',
            note: 'Edit App.tsx to change this screen and then come back to see your edits.',
        },
        {
            id: 2,
            title: 'Step One',
            note: 'Edit App.tsx to change this screen and then come back to see your edits.',
        },
        {
            id: 3,
            title: 'Step One',
            note: 'Edit App.tsx to change this screen and then come back to see your edits.',
        },
    ]);
    const [selectedNote, setSelectedNote] = useState<noteType>();
    const [showEditor, setShowEditor] = useState(false);
    const isDarkMode = useColorScheme() === 'dark';

    const getStoredData = async () => {
        const data = await retrieveSecureData(KEY_NOTES_LIST);
        if (data) {
            console.log('-------- data ----', JSON.stringify(data, null, 4));
            setNotes(data);
        }
    };

    useEffect(() => {
        getStoredData();
    }, []);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const saveData = (note: noteType) => {
        let data: notesType = JSON.parse(JSON.stringify([...notes]));
        const editedNote = data.find(it => it.id === note.id);
        if (editedNote) {
            editedNote.note = note.note;
            editedNote.title = note.title;
        } else {
            data = JSON.parse(JSON.stringify([note, ...notes]));
        }

        setNotes(data);
        storeSecureData(KEY_NOTES_LIST, data);
    };

    const renderList = () => {
        return (
            <View style={[backgroundStyle, {height: '100%'}]}>
                <View style={styles.headerRow}>
                    <Header title="Notes" />
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            setShowEditor(true);
                        }}
                        style={styles.navButton}>
                        <Text style={styles.saveText}>Create</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        backgroundColor: isDarkMode
                            ? Colors.black
                            : Colors.white,
                        paddingTop: 16,
                    }}>
                    {notes.map((it, i) => (
                        <Section
                            key={i}
                            onPress={note => {
                                setSelectedNote(note);
                                setShowEditor(true);
                            }}
                            note={it}
                        />
                    ))}
                </ScrollView>
            </View>
        );
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
                    onClose={() => setShowEditor(false)}
                    onSave={note => {
                        saveData(note);
                        setShowEditor(false);
                    }}
                />
            )}
            {!showEditor && renderList()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        paddingVertical: 16,
        marginHorizontal: 24,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 12,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    editor: {
        height: '100%',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    navButton: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    saveText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'brown',
    },
    closeText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'brown',
    },
    inputTitle: {
        fontSize: 16,
        height: 44,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 2,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 16,
        backgroundColor: Colors.white,
    },
    inputNote: {
        fontSize: 16,
        height: 350,
        backgroundColor: Colors.white,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 2,
        paddingHorizontal: 10,
        marginHorizontal: 16,
    },
});

export default App;
