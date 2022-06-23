import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../src/redux/reducers';
import { LoveItListScreen } from '../src/screens/LoveItListScreen';

jest.mock("@react-native-async-storage/async-storage", () => ({
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve()),
}))

jest.mock('redux-persist', () => {
    const real = jest.requireActual('redux-persist');
    return {
        ...real,
        persistReducer: jest
            .fn()
            .mockImplementation((config, reducers) => reducers),
    };
});

it('Love-it List screen renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <LoveItListScreen />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});