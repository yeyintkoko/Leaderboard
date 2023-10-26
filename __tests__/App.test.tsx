/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {
    checkNameInTopList,
    getLeader,
    getRankByName,
    getTopLeaderCards,
    getTopLeaders,
} from '../src/utilities/leaderboard';
import {testLeader, top10Leaders} from '../src/test_data';

it('renders correctly', async () => {
    let wrapper;
    await act(async () => {
        wrapper = renderer.create(<App />);
    });
    await expect(wrapper!.toJSON()).toMatchSnapshot();
});

it('given count, getTopLeaders() return top leaders in count', () => {
    expect(getTopLeaders(10)).toStrictEqual(top10Leaders);
});

it('given name, getLeader() return leader', () => {
    expect(getLeader('Tobias Fager')).not.toBeNull();
    expect(getLeader('Tobias Fager')?.id).toEqual(testLeader.id);
});

it('given top leaders and an empty name, checkNameInTopList verify if name exists in list', () => {
    expect(checkNameInTopList('', getTopLeaders(10))).toBe(false);
    expect(checkNameInTopList('', getTopLeaders(100))).toBe(true);
    expect(checkNameInTopList('Emma', getTopLeaders(10))).toBe(true);
});

it('given count and an name, getTopLeaderCards return leaders to present', () => {
    expect(getTopLeaderCards(5, '')).toHaveLength(5);
    expect(getTopLeaderCards(20, 'Ye Yint')).toEqual([]);
    expect(
        getTopLeaderCards(8, 'Adh Fuoo').find(it => it.name === 'Adh Fuoo')
            ?.rank,
    ).toEqual(8);
});

it('given name, getRankByName return rank', () => {
    expect(getRankByName(testLeader.name, 10)).toEqual(6);
});

it('given learder list, user can search by leader name', () => {
    const {getAllByText, getByPlaceholderText, getByTestId} = render(<App />);
    fireEvent.changeText(getByPlaceholderText('Search by name'), 'Adh Fuoo');
    fireEvent.press(getByTestId('searchBtn'));
    expect(getAllByText('Adh Fuoo')).toHaveLength(1);
    expect(getAllByText('10')).toHaveLength(1);
    expect(getAllByText('0')).toHaveLength(1);
    expect(getAllByText('Yes')).toHaveLength(1);
});
