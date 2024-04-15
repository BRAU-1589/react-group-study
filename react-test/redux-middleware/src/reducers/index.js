// src/reducers/index.js
import { INCREMENT } from '../actions/actionTypes';

const initialState = {
    count: 0
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            };
        default:
            return state;
    }
};

export default rootReducer;