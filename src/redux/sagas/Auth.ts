import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchTodoFailure, fetchTodoRequest, fetchTodoSuccess } from '../actions/Auth';
import ActionTypes from '../ActionTypes';
import { ITodo } from '../reducers/types';

export const getTodos = () => axios.get<ITodo[]>("https://jsonplaceholder.typicode.com/todos")

// Worker saga - Fired on FETCH_TODO_REQUEST Action
export function* fetchTodoSaga(): Generator<any, any, any> {
    try {
        const response = yield call(getTodos);
        yield put(
            fetchTodoSuccess({
                todos: response.data
            })
        )
    } catch (e: any) {
        yield put(
            fetchTodoFailure({
                error: e.message
            })
        )
    }
}

// starts worker saga on latest dispatched FETCH_TODO_REQUEST action
// Allows concurrent increment
export function* todoSaga() {
    yield all([takeLatest(ActionTypes.FETCH_TODO_REQUEST, fetchTodoSaga)])
}

export default todoSaga;