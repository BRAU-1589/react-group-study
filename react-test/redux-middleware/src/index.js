// src/index.js
import store from './store';
import { increment } from './actions';

console.log(store.getState());
store.dispatch(increment());
console.log(store.getState());