/*
React.memo를 사용하는 것만으로 컴포넌트 최적화가 끝나지 않습니다. 
현재 프로젝트에서는 todos 배열이 업데이트되면 onRemove와 onToggle 함수도 새롭게 바뀌기 때문입니다. 

onRemove와 onToggle 함수는 배열 상태를 업데이트하는 과정에서 최신 상태의 todos를 참조합니다. 

때문에 todos 배열이 바뀔 때마다 함수가 새로 만들어집니다. 
이렇게 함수가 계속 만들어지는 상황을 방지하는 방법은 두 가지입니다. 

첫 번째 방법은 useState의 함수형 업데이트 기능을 사용하는 것이고, 
두 번째 방법은 useReducer를 사용하는 것입니다.


setTodos 안에 todos =>를 앞에 넣으면 됩니다. 
이 코드를 저장하고 Profiler 개발자 도구로 성능을 측정합시다. 
렌더링 소요시간이 358.4ms에서 20.7ms로 줄었습니다. 
회색 빗금으로 그어져 있는 박스는 리렌더링되지 않은 컴포넌트를 나타냅니다. 
차트 아이콘을 누르면 리렌더링된 컴포넌트의 수가 줄어든 것을 확인할 수 있습니다.
*/





import { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

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

const BeSlow = () => {
  const [todos, setTodos] = useState(createBulkTodos);
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

  //수정한 onInsert

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  }, []);

  //기존 onRemove
  // const onRemove = useCallback(
  //   (id) => {
  //     setTodos(todos.filter((todo) => todo.id !== id));
  //   },
  //   [todos]
  // );

  //수정 onRemove
  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
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

  //수정 onToggle
const onToggle = useCallback((id) => {
  setTodos((todos) => // 여기서 'todos'는 현재 상태의 스냅샷을 나타내며, 올바르게 배열을 순회합니다.
    todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    )
  );
}, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default BeSlow;
