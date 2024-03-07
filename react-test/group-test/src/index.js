import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from './App'; //useMemo, useCallback 테스트
import Todo from "./Todo"; //리액트 10강 일정관리 테스트
//import BeSlow from './react-11-1'; //리액트 11강 - 1 일정관리 성능 느려지게
//import BeSlow from './react-11-useState'; //리액트 11강 - useState 사용
//import BeSlow from './react-11-useReducer'; //리액트 11강 - useReducer 사용'
//import BeSlow from './react-11-react-virtualized'; //리액트 11강 - useReducer 사용
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>
);

reportWebVitals();
