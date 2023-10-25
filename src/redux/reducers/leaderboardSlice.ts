import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {LeaderCardType} from '../../utilities/types';

export interface LeaderboardState {
    leaders: LeaderCardType[];
}

const initialState: LeaderboardState = {
    leaders: [],
};

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setLeaders: (state, action: PayloadAction<LeaderCardType[]>) => {
            state.leaders = action.payload;
        },
        reset: state => {
            state.leaders = [];
        },
    },
});

export const {setLeaders, reset} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
