// index.js

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterReducer';

import { increment, decrement } from './actions';

// configureStore를 사용하여 스토어 생성
const store = configureStore({
  reducer: counterReducer,
});

function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
);
