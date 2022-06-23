import ActionTypes from "../ActionTypes";
import {
    FetchTodoRequest,
    FetchTodoSuccess,
    FetchTodoSuccessPayload,
    FetchTodoFailure,
    FetchTodoFailurePayload,
} from "../reducers/types";

export const login = (user: any) => {
    // console.log("USERRR == ", user);
    return {
        type: ActionTypes.LOGIN,
        payload: user
    }
}

export const fetchTodoRequest = (): FetchTodoRequest => ({
    type: ActionTypes.FETCH_TODO_REQUEST,
});

export const fetchTodoSuccess = (
    payload: FetchTodoSuccessPayload
): FetchTodoSuccess => ({
    type: ActionTypes.FETCH_TODO_SUCCESS,
    payload,
});

export const fetchTodoFailure = (
    payload: FetchTodoFailurePayload
  ): FetchTodoFailure => ({
    type: ActionTypes.FETCH_TODO_FAILURE,
    payload,
  });


