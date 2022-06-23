import { createStore, combineReducers, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import logger from "redux-logger";

import LoginReducer from './Auth';
import { rootSaga } from '../sagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers(
    { user: LoginReducer }
);


// const configureStore = () => {
//     return createStore(persistReducer(persistConfig, rootReducer), applyMiddleware(sagaMiddleware, logger));
// }

const configureStore = createStore(persistReducer(persistConfig, rootReducer), applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga);

export const store = configureStore;
export const persistor = persistStore(store);