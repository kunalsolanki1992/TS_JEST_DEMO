import { all, fork } from "redux-saga/effects";

import todoSaga from "./Auth";

export function* rootSaga() {
    yield all([fork(todoSaga)])
}
