import {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

interface SearchBarProps {
    onSearch: (text: string) => void;
}

const SearchBar = ({onSearch}: SearchBarProps) => {
    const [keyword, setKeyword] = useState('');

    return (
        <View style={styles.headerRow}>
            <View style={styles.searchInputRow}>
                <Text style={styles.searchCharacter}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={text => {
                        setKeyword(text);
                    }}
                    placeholder="Search by name"
                    autoComplete="off"
                    autoCorrect={false}
                    blurOnSubmit
                    onSubmitEditing={() => onSearch(keyword)}
                    clearButtonMode="always"
                />
            </View>
            <Pressable
                testID="searchBtn"
                style={styles.searchButton}
                onPress={() => onSearch(keyword)}>
                <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    searchInputRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 5,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    searchCharacter: {
        fontSize: 24,
        marginRight: 4,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    searchButton: {
        height: 42,
        paddingHorizontal: 16,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    searchButtonText: {
        fontSize: 16,
        color: '#000',
    },
});

export default SearchBar;
