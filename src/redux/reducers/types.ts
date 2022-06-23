import ActionTypes from "../ActionTypes";

export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface TodoState {
    user: any;
    pending: boolean;
    todos: ITodo[];
    error: string | null;
}

export interface FetchTodoSuccessPayload {
    todos: ITodo[];
}

export interface FetchTodoFailurePayload {
    error: string;
}

export interface FetchTodoRequest {
    type: typeof ActionTypes.FETCH_TODO_REQUEST;
}

export type FetchTodoSuccess = {
    type: typeof ActionTypes.FETCH_TODO_SUCCESS;
    payload: FetchTodoSuccessPayload;
};

export type FetchTodoFailure = {
    type: typeof ActionTypes.FETCH_TODO_FAILURE;
    payload: FetchTodoFailurePayload;
};

export type Auth = {
    type: typeof ActionTypes.LOGIN;
    payload: any;
}

export type TodoActions =
    | FetchTodoRequest
    | FetchTodoSuccess
    | FetchTodoFailure
    | Auth;
