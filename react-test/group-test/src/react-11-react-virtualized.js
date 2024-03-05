/*
우선 이 라이브러리를 설치합시다.

$ yarn add react-virtualized

이제 react-virtualized를 사용하여 최적화.

react에서 제공하는 List 컴포넌트를 사용하여 TodoList 컴포넌트의 성능을 최적화할 것입니다. 최적화를 수행하려면 우선 각 항목의 실제 크기를 px 단위로 알아내야 합니다. 
이 값은 크롬 개발자 도구의 좌측 상단에 있는 아이콘을 눌러 확인할 수 있습니다.


각 항목의 크기는 가로 512px, 세로 57px입니다.

정확한 스크롤 위치 계산: 
효율적인 렌더링 및 리소스 관리
사용자 경험 개선: 
동적 항목 크기 대응: 
*/

//
/*
ToDoList.js
List 컴포넌트를 사용하기 위해 rowRenderer 함수를 새로 작성하였습니다.이 함수는 react - virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할 때 사용하며, 이 함수를 List 컴포넌트의 props로 설정해야 합니다.이 함수는 파라미터에 index, key, style 값을 객체 타입으로 받아서 사용합니다.

List 컴포넌트를 사용할 때는 해당 리스트의 전체 크기, 각 항목 높이, 각 항목을 렌더링할 때 사용하는 함수, 배열을 props로 넣어야 합니다. 그래야 이 컴포넌트가 전달받은 props를 사용하여 자동으로 최적화합니다.
*/


/*
ToDoListItem.js
render 함수에서 기존에 보여주던 내용을 div로 감쌌습니다. 
이 div는 className으로 TodoListItem-virtualized를 설정하였고, 
props로 받은 style을 적용하였습니다. 
이는 홀수 짝수 항목에 대해 다른 배경 색상을 설정하기 위해서입니다.

그다음에는 TodoListItem.scss 파일에서 최하단에 있던 & + &를 사용한 코드를 지우고, 코드 최상단에 .TodoListItem-virtualized 코드를 삽입합시다.
*/

//import { useState, useRef, useCallback } from 'react';
import { useReducer, useRef, useCallback } from 'react'; //useReducer사용
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
//import TodoList from './components/TodoList';
import TodoList from './components-react-virtualized/TodoList'; //11.7 TodoList 컴포넌트 최적화하기 - react-virtualized사용 시



//import TodoList from './components-react-virtualized/TodoListResponsive'; //11.7 TodoList 컴포넌트 최적화하기 - react-virtualized 반응형사용 시
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
