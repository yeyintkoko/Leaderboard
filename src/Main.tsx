/**
 * Leaderboard React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getTopLeaderCards} from './utilities/leaderboard';
import LeaderCard from './components/LeaderCard';
import SearchBar from './components/SearchBar';
import EmptyList from './components/EmptyList';
import type {RootState} from './redux/store';
import {setLeaders, reset} from './redux/reducers/leaderboardSlice';

const Main = (): JSX.Element => {
    const leaders = useSelector(
        (state: RootState) => state.leaderboard.leaders,
    );
    const dispatch = useDispatch();

    const getLeaderList = useCallback((name: string) => {
        const list = getTopLeaderCards(10, name);
        dispatch(setLeaders(list));
    }, []);

    useEffect(() => {
        getLeaderList('Patrick Kennedy');

        return () => {
            dispatch(reset());
        };
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <SearchBar
                    onChangeText={getLeaderList}
                    onSearch={getLeaderList}
                />
                <FlatList
                    data={leaders}
                    renderItem={({item}) => <LeaderCard {...item} />}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={
                        <EmptyList
                            message="This user name does not exist! Please specify an
                    existing user name!"
                        />
                    }
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
