/**
 * Leaderboard React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getRankByName, getTopLeaderCards} from './utilities/leaderboard';
import LeaderCard from './components/LeaderCard';
import SearchBar from './components/SearchBar';
import EmptyList from './components/EmptyList';
import type {RootState} from './redux/store';
import {setLeaders, reset} from './redux/reducers/leaderboardSlice';

const ITEM_HEIGHT = Platform.select({ios: 106.33, android: 116});
const LEADER_COUNT = 10;

const Main = (): JSX.Element => {
    const leaders = useSelector(
        (state: RootState) => state.leaderboard.leaders,
    );
    const dispatch = useDispatch();
    const refFlatList = useRef<FlatList>(null);
    const [searchedName, setSearchedName] = useState('Patrick Kennedy');

    const getLeaderList = useCallback((name: string) => {
        setSearchedName(name);
        const list = getTopLeaderCards(LEADER_COUNT, name);
        dispatch(setLeaders(list));
    }, []);

    const scrollToBottom = useCallback(() => {
        if (leaders.length) {
            const rank = getRankByName(searchedName, LEADER_COUNT);
            refFlatList.current?.scrollToIndex({
                index: rank ? rank - 1 : 0,
                animated: true,
            });
        }
    }, [leaders]);

    useEffect(scrollToBottom, [scrollToBottom]);

    useEffect(() => {
        getLeaderList(searchedName);
        return () => {
            dispatch(reset());
        };
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <SearchBar onSearch={getLeaderList} />
                <FlatList
                    ref={refFlatList}
                    data={leaders}
                    renderItem={({item}) => <LeaderCard card={item} />}
                    getItemLayout={(data, index) => ({
                        length: ITEM_HEIGHT,
                        offset: ITEM_HEIGHT * index,
                        index,
                    })}
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
