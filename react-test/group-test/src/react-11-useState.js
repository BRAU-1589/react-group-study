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


/*
기존 코드:
의존성 배열에 todos를 포함시켰습니다.
이는 todos 배열이 변경될 때마다 onInsert 함수가 새로 생성되어야 함을 의미합니다.
즉, todos 배열의 상태가 업데이트 될 때마다 onInsert 콜백도 업데이트 되어야 합니다.

수정된 코드:
의존성 배열이 비어 있습니다.
이는 onInsert 함수가 컴포넌트가 처음 렌더링될 때 단 한 번만 생성되고, 이후 재생성되지 않음을 의미합니다.
todos 상태의 변경에 따라 onInsert가 재생성되지 않도록 함으로써, 성능상의 이점을 얻을 수 있습니다.




setTodos 함수 호출 방식:

기존 코드: setTodos 함수를 호출할 때 현재의 todos 상태에 직접 접근하여 concat 메소드를 사용했습니다.
이 방식은 todos 상태가 최신 상태임을 보장하기 위해 해당 상태에 직접적으로 의존하고 있습니다.

수정된 코드: setTodos 함수를 호출할 때 함수형 업데이트를 사용합니다.
setTodos 함수에 콜백 함수를 전달하고, 이 콜백 함수는 현재의 todos 상태를 받아와서 새로운 상태를 반환합니다.
이 방식은 현재의 todos 상태가 최신 상태임을 보장하며, todos 상태에 직접 의존하지 않기 때문에 의존성 배열을 비워둘 수 있습니다.







성능 최적화:
* useCallback 훅과 함께 함수형 업데이트를 사용하는 경우,
* useCallback의 의존성 배열에 상태를 포함시키지 않아도 된다.
* 이는 해당 콜백 함수가 불필요하게 자주 재생성되는 것을 방지할 수 있음.

* 예를 들어,
* 기존 코드에서는
* onInsert 함수가 todos 상태에 의존하기 때문에 todos 상태가 변할 때마다,
* onInsert 함수도 재생성되어야 합니다.

* 하지만 함수형 업데이트를 사용할 경우, onInsert 함수 내에서 직접 todos 상태를 참조할 필요가 없어지므로,
* useCallback의 의존성 배열이 빈 배열([])로 유지될 수 있으며,
* 이는 onInsert 함수가 컴포넌트가 마운트될 때 단 한 번만 생성(처음 렌더링될 때 단 한 번만 생성)되도록 한다.

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

    /*
  기존 코드:
  의존성 배열에 todos를 포함시켰습니다.
  이는 todos 배열이 변경될 때마다 onInsert 함수가 새로 생성되어야 함을 의미합니다.
  즉, todos 배열의 상태가 업데이트 될 때마다 onInsert 콜백도 업데이트 되어야 합니다.
  */
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




  /*
    수정된 코드:
    의존성 배열이 비어 있습니다.
    이는 onInsert 함수가 컴포넌트가 처음 렌더링될 때 단 한 번만 생성되고, 이후 재생성되지 않음을 의미합니다.
    todos 상태의 변경에 따라 onInsert가 재생성되지 않도록 함으로써, 성능상의 이점을 얻을 수 있습니다.
  */

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


  /*
  요약하자면,
  수정된 코드는 onInsert 함수가 todos 상태의 변경에 의존하지 않도록 하여 불필요한 재생성을 방지하고,
  함수형 업데이트를 통해 상태 업데이트 시 현재 상태의 최신을 보장하는 방식으로 최적화.
*/





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
