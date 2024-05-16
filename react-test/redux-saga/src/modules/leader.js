import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "../libs/api"

const GET_POST = "leader/GET_POST"; // post 를 요청하는 액션
const GET_POST_SUCCESS = "leader/GET_POST_SUCCESS"; // post 요청 성공 시 데이터(post)를 전달하는 액션
const GET_POST_FAILURE = "leader/GET_POST_FAILURE"; // post 요청 실패 시 처리하는 액션

const GET_USERS = "leader/GET_USERS"; // users 를 요청하는 액션
const GET_USERS_SUCCESS = "leader/GET_USERS_SUCCESS"; // users 요청 성공 시 데이터(users) 를 전달하는 액션
const GET_USERS_FAILURE = "leader/GET_USERS_FAILURE"; // users 요청 실패 시 처리하는 액션

export const getPost = createAction(GET_POST, (id) => id); // payload가 id인 액션객체 생성
export const getUsers = createAction(GET_USERS); // payload가 없는 액션객체 생성

// state 의 초기값 설정
const initialState = {
  post: null,
  users: null,
};

//** Redux **//
// post/users 요청 성공 시 Data 처리하는 redux만 정의
// post/users 요청 실패 시 처리할 데이터 없음
// post/users 요청 액션은 Saga에서 수행
const leader = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState
);

export default leader;

//** Saga **//
// GET_POST/GET_USERS 액션에 대한 서버요청을 위한 Saga
export function* leaderSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

// GET_POST 액션 dispatch 시 실행될 함수. 비동기로 서버의 post 데이터 요청
function* getPostSaga(action) {
  try {
    const post = yield call(api.getPost, action.payload);
    // post 데이터요청하는 비동기함수인 getPost을 요청하며, 인자로 action.payload인 id를 넘김
    yield put({
      type: GET_POST_SUCCESS, // 요청 성공 액션을 dispatch함.
      payload: post.data, // 액션 dispatch할 때 payload로 post.data(포스트 내용)을 전달함
    });
  } catch (e) {
    yield put({
      type: GET_POST_FAILURE, // 요청 실패 액션을 dispatch함
      payload: e, // 액션 dispatch할 때 payload로 에러를 전달함
      error: true, // 액션 객체의 항목에 error: true를 넘겨줌
    });
  }
}

// GET_USERS 액션 dispatch 시 실행될 함수. 비동기로 서버의 users 데이터 요청
function* getUsersSaga() {
  try {
    const users = yield call(api.getUsers);
    // users 데이터를 요청하는 비동기함수인 getUsers를 요청하며, 전달인자는 없음.
    yield put({
      type: GET_USERS_SUCCESS,
      payload: users.data,
    });
    console.log('data')
  } catch (e) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
    console.log('error')
  }
}


// worker Saga: Worker Saga는 실제로 비동기 작업을 수행하는 부분이다.
// Worker Saga에서는 call 이펙트를 사용하여 비동기 호출을 하고, 호출 결과에 따라 액션을 디스패치하여 Redux 상태를 변경한다.
// ex) getPostSaga, getUsersSaga 

// Watcher Saga: 특정 액션을 감시하고, 해당 액션이 발생하면 적절한 Worker Saga를 호출하는 부분이다. 
// Watcher Saga에서는 takeLatest 이펙트를 사용하여 특정 액션을 감시하고, 해당 액션이 발생하면 적절한 Worker Saga를 실행합니다.
// ex) leaderSaga