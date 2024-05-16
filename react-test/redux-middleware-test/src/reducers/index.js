// src/reducers/index.js
import { INCREMENT, DECREMENT } from '../actions/actionTypes';

const initialState = {
    count: 0,
    logs: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1,
                logs: [...state.logs, `Incremented to ${state.count + 1}`]
            };
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1,
                logs: [...state.logs, `Decremented to ${state.count - 1}`]
            };
        default:
            return state;
    }
}

export default rootReducer;