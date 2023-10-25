/**
 * Leaderboard React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {LeaderCardType} from './utilities/types';
import {getTopLeaderCards} from './utilities/leaderboard';
import LeaderCard from './components/LeaderCard';
import SearchBar from './components/SearchBar';

const Main = (): JSX.Element => {
    const [leaderList, setLeaderList] = useState<LeaderCardType[]>([]);

    const getLeaderList = useCallback((name: string) => {
        setLeaderList(getTopLeaderCards(10, name));
    }, []);

    useEffect(() => {
        getLeaderList('Patrick Kennedy');
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <SearchBar
                    onChangeText={getLeaderList}
                    onSearch={getLeaderList}
                />
                <FlatList
                    data={leaderList}
                    renderItem={({item}) => <LeaderCard {...item} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    container: {
        flex: 1,
    },
});

export default Main;
