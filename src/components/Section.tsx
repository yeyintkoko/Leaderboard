import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {noteType} from '../utilities/types';

type SectionProps = PropsWithChildren<{
    note: noteType;
    onPress: (node: noteType) => void;
}>;

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
});

export default Section;
