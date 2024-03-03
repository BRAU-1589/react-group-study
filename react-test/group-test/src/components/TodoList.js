import React from 'react';
import './TodoList.scss';
//import TodoListItem from './TodoListItem';
import TodoListItem from '../components11/TodoListItem'; //11-3강 React.Memo 사용
/**
 * TodoList.js
 * TodoListItem 반복을 위한 리스트 컴포넌트
 */

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className={'TodoList'}>
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
