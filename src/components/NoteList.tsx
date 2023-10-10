import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native';
import {noteType, notesType} from '../utilities/types';
import Section from './Section';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface NoteListProps {
    notes: notesType;
    onItemPress: (note: noteType) => void;
    onCreatePress: () => void;
}

const NoteList = ({
    notes,
    onItemPress,
    onCreatePress,
}: NoteListProps): JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <View style={[backgroundStyle, {height: '100%'}]}>
            <View style={styles.headerRow}>
                <Text
                    style={[
                        styles.header,
                        {
                            color: isDarkMode ? Colors.white : Colors.black,
                        },
                    ]}>
                    Notes
                </Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={onCreatePress}
                    style={styles.navButton}>
                    <Text style={styles.createText}>Create</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                contentContainerStyle={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    paddingTop: 16,
                }}>
                {notes.map((it, i) => (
                    <Section key={i} onPress={onItemPress} note={it} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
    navButton: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    createText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'brown',
    },
});

export default NoteList;
