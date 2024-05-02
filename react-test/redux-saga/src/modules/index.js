// reducer, saga 통합
import { combineReducers } from "redux";
import leader, { leaderSaga } from "./leader";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  leader,
});

export default rootReducer;

export function* rootSaga() {
  yield all([leaderSaga()]);
}