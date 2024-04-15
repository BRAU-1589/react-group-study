// src/store.js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import loggerMiddleware from './middleware/loggerMiddleware';

const store = createStore(
    rootReducer,
    applyMiddleware(loggerMiddleware)
);

export default store;