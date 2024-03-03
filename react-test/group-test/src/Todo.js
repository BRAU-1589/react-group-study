import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

/**
 * Todo.js
 * 전체적인 data 관리
 * todos 관련 처리를 하는 메서드 작성
 */

const todoList = [
  {
    id: 1,
    text: '리액트 10강 테스트',
    checked: true,
  },
  {
    id: 2,
    text: '리액트 그룹 스터디 준비',
    checked: true,
  },
  {
    id: 3,
    text: '일정관리 테스트',
    checked: false,
  },
  {
    id: 4,
    text: '성능 테스트',
    checked: false,
  },
];

const Todo = () => {
  const [todos, setTodos] = useState(todoList);
  const nextId = useRef(4); // 렌더링이 필요하지 않은 data기 때문에 useRef 사용

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      console.log(todo);
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos]
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
    },
    [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default Todo;
