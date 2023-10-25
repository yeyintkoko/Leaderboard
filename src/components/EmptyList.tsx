import {StyleSheet, Text, View} from 'react-native';

interface EmptyListProps {
    message: string;
}
const EmptyList = ({message}: EmptyListProps) => {
    return (
        <View style={styles.emptyList}>
            <Text style={styles.emptyMessage}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyList: {
        flex: 1,
        paddingTop: 50,
    },
    emptyMessage: {
        fontSize: 16,
        fontWeight: '500',
        color: 'orange',
        textAlign: 'center',
        marginHorizontal: 25,
    },
});

export default EmptyList;
