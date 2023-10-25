import data from '../data/leaderboard.json';
import {LeaderType, LeaderCardType} from './types';

export const getTopLeaders = (count: number): LeaderType[] => {
    const list = Object.values(data);
    return list
        .map(it => ({id: it.uid, name: it.name, bananas: it.bananas}))
        .sort((a, b) => {
            if (a.bananas > b.bananas) return -1;
            if (a.bananas < b.bananas) return 1;
            return 0;
        })
        .slice(0, count);
};

export const getLeader = (searchKey: string): LeaderType | null => {
    const list = Object.values(data);
    const item = list.find(
        it =>
            it.name.localeCompare(searchKey, undefined, {
                sensitivity: 'accent',
            }) === 0,
    );
    if (item) {
        return {id: item.uid, name: item.name, bananas: item.bananas};
    }
    return null;
};

export const checkNameInTopList = (searchKey: string, list: LeaderType[]) => {
    return list.some(
        it =>
            it.name.localeCompare(searchKey, undefined, {
                sensitivity: 'accent',
            }) === 0,
    );
};

export const getTopLeaderCards = (
    count: number,
    searchKey: string,
): LeaderCardType[] => {
    const list: LeaderType[] = JSON.parse(JSON.stringify(getTopLeaders(count)));
    const isNameInTopList = checkNameInTopList(searchKey, list);

    if (!isNameInTopList) {
        const searchedLeader = getLeader(searchKey);
        if (!searchedLeader) {
            return [];
        }
        if (list.length) {
            list[list.length - 1] = searchedLeader;
        }
    }
    return list.map((it, index) => ({
        id: it.id,
        name: it.name,
        bananas: it.bananas,
        rank: index,
        searched:
            it.name.localeCompare(searchKey, undefined, {
                sensitivity: 'accent',
            }) === 0,
    }));
};
