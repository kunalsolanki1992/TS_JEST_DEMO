import ActionTypes from "../ActionTypes";
import { TodoState, TodoActions } from './types';

const initialState: TodoState = {
    user: {},
    pending: false,
    todos: [],
    error: null,
}

const LoginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                user: action.payload
            }

        case ActionTypes.FETCH_TODO_REQUEST:
            return {
                ...state,
                pending: true
            }

        case ActionTypes.FETCH_TODO_SUCCESS:
            return {
                ...state,
                pending: false,
                todos: action.payload.todos,
                error: null
            }

        case ActionTypes.FETCH_TODO_SUCCESS:
            return {
                ...state,
                pending: false,
                todos: [],
                error: action.payload.error
            }

        default:
            return initialState;
    }
}

export default LoginReducer;