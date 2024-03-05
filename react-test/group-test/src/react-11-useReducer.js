/*
useReducer를 사용하면 두 번째 파라미터에 초기 상태를 넣어야 합니다. 
지금은 그 대신 undefined를 넣고 세 번째 파라미터에 초기 상태를 만드는 함수 createBulkTodos를 넣었습니다. 
이러면 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수가 호출됩니다.

이 코드를 저장하고 Profiler 개발자 도구로 성능을 측정합시다. 
렌더링 소요시간이 358.4ms에서 11.6ms로 줄었습니다.


useReducer를 사용하면 기존 코드를 많이 고쳐야 하는 단점이 있으나 
상태를 업데이트하는 로직을 모아서 컴포넌트 밖에 둘 수 있는 장점이 있습니다. 

성능상으로는 useState의 함수형 업데이트를 사용하는 방법과 
useReducer를 사용하는 방법이 비슷하기 때문에 취향에 따라 결정하면 됩니다.
*/


/**
 * 11.6 불변성의 중요성
리액트 컴포넌트에서 상태를 업데이트할 때 불변성을 지키는 것이 매우 중요합니다. 
이전에는 기존 데이터를 수정할 때 직접 수정하지 않고, 
새로운 배열을 만든 후 새로운 객체를 만들어 필요한 부분을 교체하는 방식으로 구현했습니다.

const onToggle = useCallback(
    id => {
      setTodos(todo =>
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },[]);
업데이트가 필요한 곳에서는 아예 새로운 배열 혹은 새로운 객체를 만들기 때문에, 
props가 바뀌었는지를 알아내어 리렌더링 성능을 최적화하였습니다. 
이렇게 기존의 값을 수정하지 않고 새로운 값을 만드는 것을 불변성을 지킨다라고 합니다. 
불변성이 지켜지지 않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못합니다. 
그러면 React.memo에서 비교하여 최적화하는 것 또한 불가능합니다.

전개 연산자(…문법)를 사용하여 내부의 값을 복사하면 얕은 복사를 하게 됩니다. 
즉, 내부의 값이 새로 복사되는 것이 아니라 
가장 바깥쪽에 있는 값만 복사되기 때문에 내부의 값이 객체, 배열이라면 내부의 값 또한 복사해야 합니다. 
때문에 배열, 객체 구조가 아주 복잡해진다면 불변성을 유지하면서 업데이트하는 것이 까다로워집니다. 
이렇게 복잡한 상황일 경우 immer라는 라이브러리의 도움을 받으면 편하게 작업할 수 있습니다. 
이는 12장에서 다룹니다.


 */




//import { useState, useRef, useCallback } from 'react';
import { useReducer, useRef, useCallback } from 'react'; //useReducer사용
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
//import TodoList from './components-react-virtualized/TodoList'; //11.7 TodoList 컴포넌트 최적화하기 - react-virtualized사용 시
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

//App.js todoReducer 함수 작성
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새로 추가
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE': // 토글
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const BeSlow = () => {
  //const [todos, setTodos] = useState(createBulkTodos);
  //const nextId = useRef(2501);

  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  const nextId = useRef(2501);

  //기존 onInsert
  // const onInsert = useCallback(
  //   (text) => {
  //     const todo = {
  //       id: nextId.current,
  //       text,
  //       checked: false,
  //     };
  //     setTodos(todos.concat(todo));
  //     nextId.current += 1;
  //   },
  //   [todos]
  // );

  //수정한 onInsert - useState

  // const onInsert = useCallback((text) => {
  //   const todo = {
  //     id: nextId.current,
  //     text,
  //     checked: false,
  //   };
  //   setTodos((todos) => todos.concat(todo));
  //   nextId.current += 1;
  // }, []);

  //수정한 onInsert - useReducer

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    //setTodos(todos=>todos.concat(todo));
    nextId.current += 1;
  }, []);

  //기존 onRemove
  // const onRemove = useCallback(
  //   (id) => {
  //     setTodos(todos.filter((todo) => todo.id !== id));
  //   },
  //   [todos]
  // );

  //수정 onRemove - useState
  /*
  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);
  */

  //수정 onRemove - useReducer
  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
    //setTodos(todos=>todos.filter(todo => todo.id !== id));
  }, []);

  //기존 onToggle
  /*
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
  */

  //수정 onToggle - useState
  /*
  const onToggle = useCallback((id) => {
    setTodos(
      (
        todos // 여기서 'todos'는 현재 상태의 스냅샷을 나타내며, 올바르게 배열을 순회합니다.
      ) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
    );
  }, []);
*/

  //수정 onToggle - useReducer
  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
    //setTodos(todo =>
    //  todos.map(todo =>
    //    todo.id === id ? { ...todo, checked: !todo.checked } : todo,
    //  ),
    //);
  }, []);
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default BeSlow;
