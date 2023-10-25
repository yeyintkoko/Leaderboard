import {useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface SearchBarProps {
    onChangeText: (text: string) => void;
    onSearch: (text: string) => void;
}

const SearchBar = ({onChangeText, onSearch}: SearchBarProps) => {
    const [keyword, setKeyword] = useState('');

    return (
        <View style={styles.headerRow}>
            <View style={styles.searchInputRow}>
                <Text style={styles.searchCharacter}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={text => {
                        setKeyword(text);
                        onChangeText(text);
                    }}
                />
            </View>
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.searchButton}
                onPress={() => onSearch(keyword)}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
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
