import {StyleSheet, Text, View} from 'react-native';
import {LeaderCardType} from '../utilities/types';

const LeaderCard = (card: LeaderCardType) => {
    return (
        <View style={styles.item}>
            <Text
                style={[styles.name, card.searched ? {color: 'brown'} : null]}>
                {card.name}
            </Text>
            <View style={styles.row}>
                <Text style={styles.key}>Rank</Text>
                <Text style={styles.separator}>-</Text>
                <Text style={styles.value}>{card.rank}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.key}>Bananas</Text>
                <Text style={styles.separator}>-</Text>
                <Text style={styles.value}>{card.bananas}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.key}>Searched</Text>
                <Text style={styles.separator}>-</Text>
                <Text style={styles.value}>{card.searched ? 'Yes' : 'No'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 16,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    key: {
        fontSize: 14,
        width: 80,
    },
    value: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: '500',
    },
    separator: {
        fontSize: 14,
    },
});

export default LeaderCard;
