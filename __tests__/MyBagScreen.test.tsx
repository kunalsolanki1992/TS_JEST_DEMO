import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';

import { fetchTodoSaga, todoSaga, getTodos } from '../src/redux/sagas/Auth';
import ActionTypes from '../src/redux/ActionTypes';
import { store, persistor } from '../src/redux/reducers';
import { MyBagScreen } from '../src/screens/MyBagScreen';
import { fetchTodoSuccess, fetchTodoFailure } from '../src/redux/actions/Auth';
import { ITodo, FetchTodoSuccessPayload, FetchTodoFailurePayload } from '../src/redux/reducers/types'
import * as API from '../src/redux/sagas/Auth';

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

it('My Bag screen renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <MyBagScreen />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

describe('todoSaga', () => {
    const genObject = todoSaga();

    // following test will fail 
    it('should wait for all fetchTodoSaga action and call todoSaga', () => {
        expect(genObject.next().value).toEqual(takeLatest(ActionTypes.FETCH_TODO_REQUEST, todoSaga))
    })

    it('should be done on next iteration', () => {
        expect(genObject.next().done).toBeTruthy()
    })
})

describe('todoSaga with mocked fetch todos == ', () => {
    it('should call API and dispatch success action', async () => {
        const dummyTodo: ITodo = {
            userId: 1,
            id: 2,
            title: 'dummy',
            completed: false
        }

        const dummyFetchToDoSuccessPayload: FetchTodoSuccessPayload = { todos: [dummyTodo] };

        const requestTodo = jest.spyOn(API, 'getTodos').mockImplementation((): any => Promise.resolve(dummyFetchToDoSuccessPayload));

        const dispatched: any[] = [];

        const result = await runSaga({
            dispatch: (action) => dispatched.push(action),
        }, fetchTodoSaga)

        expect(requestTodo).toHaveBeenCalledTimes(1);

        expect(dispatched).toEqual([fetchTodoSuccess(dummyFetchToDoSuccessPayload)])
        requestTodo.mockClear();
    })

    it('should call API and dispatch error action', async () => {
        const dummyFetchToDoFailurePayload: FetchTodoFailurePayload = { error: 'Dummy Failure'};
        const requestTodo = jest.spyOn(API, 'getTodos').mockImplementation((): any => Promise.reject());

        const dispatched: any[] = [];

        const result = await runSaga({
            dispatch: (action) => dispatched.push(action),
        }, fetchTodoSaga)

        expect(requestTodo).toHaveBeenCalledTimes(1);

        expect(dispatched).toEqual([fetchTodoFailure(dummyFetchToDoFailurePayload)]);
        requestTodo.mockClear();

    })
})