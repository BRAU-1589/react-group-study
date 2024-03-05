//TodoList.js
/*
ToDoList.js
List 컴포넌트를 사용하기 위해 rowRenderer 함수를 새로 작성하였습니다.
이 함수는 react - virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할 때 사용하며, 
이 함수를 List 컴포넌트의 props로 설정해야 합니다.
이 함수는 파라미터에 index, key, style 값을 객체 타입으로 받아서 사용합니다.

List 컴포넌트를 사용할 때는 해당 리스트의 전체 크기, 각 항목 높이, 각 항목을 렌더링할 때 사용하는 함수, 배열을 props로 넣어야 합니다. 
그래야 이 컴포넌트가 전달받은 props를 사용하여 자동으로 최적화합니다.
*/




import React, { useCallback } from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';
import { List } from 'react-virtualized';

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos]
  );

  return (
    <List
      className='TodoList'
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
    />
  );
};

export default React.memo(TodoList);
