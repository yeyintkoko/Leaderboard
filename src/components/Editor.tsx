/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {noteType} from '../utilities/types';

interface EditorProps {
    selectedNote?: noteType;
    onSave: (note: noteType) => void;
    onClose: () => void;
}

const Editor = ({onSave, onClose, selectedNote}: EditorProps): JSX.Element => {
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
                placeholder="Title"
                onChangeText={setTitle}
                onEndEditing={() => {
                    refNote.current?.focus();
                }}
            />
            <TextInput
                ref={refNote}
                style={styles.inputNote}
                placeholder="Note"
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

const styles = StyleSheet.create({
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

export default Editor;
