import { render, screen } from "@testing-library/react";
//import App from './App';
import Todo from "./Todo"; //리액트 10강 일정관리 테스트
//import BeSlow from './react-11-1'; //리액트 11강 - 1 일정관리 성능 느려지게
//import BeSlow from './react-11-useState'; //리액트 11강 - useState 사용
//import BeSlow from './react-11-useReducer'; //리액트 11강 - useReducer 사용
//import BeSlow from './react-11-react-virtualized'; //리액트 11강 - useReducer 사용

test("renders learn react link", () => {
  render(<Todo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
