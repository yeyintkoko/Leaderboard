/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {getData, saveData} from '../src/controllers/notes';

it('renders correctly', () => {
    renderer.create(<App />);
});

it('get notes from local store', () => {
    expect(getData()).toBe([]);
});

it('save note to local store', () => {
    expect(
        saveData({
            id: Date.now(),
            title: 'Test',
            note: 'Test note Test note note',
        }),
    ).toBeCalledWith();
});
