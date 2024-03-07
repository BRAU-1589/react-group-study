/*React.memo는 컴포넌트를 감싸며, props의 변화가 없으면 리렌더링을 방지해 성능을 최적화할 수 있게 함 */


/*
아래 최적화 코드는 현재 프로젝트 성능에 영향을 주지 않습니다. 
Todolist 컴포넌트의 부모 컴포넌트인 react-11~ 컴포넌트가 리렌더링되는 이유가
todos 배열이 업데이트될 때이기 때문.

지금 TodoList 컴포넌트는 불필요한 리렌더링이 발생하지 않습니다.

그러나  react-11~  컴포넌트에서 state가 추가되어 해당 값이 업데이트될 때
TodoList 컴포넌트가 불필요한 리렌더링을 할 수도 있습니다.

이를 방지하기 위하여 React.memo를 사용하여 미리 최적화한 것입니다.

리스트 관련 컴포넌트를 작성할 때에는 리스트 아이템과 리스트, 
두 가지 컴포넌트를 최적화해야 합니다.
*/


// TodoList.js
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className='TodoList'>
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

export default React.memo(TodoList); //memo
