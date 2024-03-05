/**
 * Todo.js
 * 성능 테스트
 *  createBulkTodos 함수를 만들어 2500개의 일정을 생성. 
 * 이 상태에서 체크하고 삭제할 때 이전보다 느려진 것이 느껴진다.
 */

/**
 * 크롬 개발자 도구를 통한 성능 모니터링
 * 
 * 이렇게 느려진 느낌을 정확히 몇 초가 걸리는지 React DevTools를 사용하여 측정할 수 있디.
 * 리액트 v17 전에는 브라우저에 내장된 성능 측정 도구의 User Timing API를 사용했으나,
 * v17부터는 리액트 전용 개발자 도구인 React DevTools를 사용하여 성능 분석을 자세하게 할 수 있다.
 * 리액트 개발자 도구의 Profiler라는 탭을 열면 좌측 상단에 파란색 녹화 버튼이 보인다.
 */


/**
 * 우측의 Rendar duration는 리렌더링에 소요된 시간을 의미
 * 변화를 화면에 반영하는데 729.2ms(20240303 테스트 기준)가 걸렸다는 의미.
 * 이 소요 시간은 컴퓨터 환경에 따라 다르게 나타남. 
 * 이제 Profiler 탭의 상단에 있는 불꽃 아이콘의 우측에 있는 랭크 차트 아이콘을 눌러보면 그래프 화면이 나타납니다.
 */

/**
 * 리렌더링된 컴포넌트를 오래 걸린 순으로 정렬하여 나열. 
 * 아래로 내려보면 많은 컴포넌트가 리렌더링된 것을 확인할 수 있다. 
 * 작은 박스들은 클릭하면 크기가 늘어나 내용을 확인할 수 있다. 
 * 이를 보면 변화를 일으킨 컴포넌트와 관련없는 컴포넌트들도 리렌더링된 것을 확인할 수 있다. 
 * 이는 좋지 못한 성능을 불러옴. 이를 최적화하는 방법을 설명.
 */



/**
 * 느려지는 원인 분석
컴포넌트는 자신이 전달받은 props가 변경될 때, 
자신의 state가 바뀔 때, 부모 컴포넌트가 리렌더링될 때, 
forceUpdate 함수가 실행될 때 리렌더링이 발생.

지금 상황을 분석하면, 항목을 체크할 경우 App 컴포넌트의 state가 변경되면서 App 컴포넌트가 리렌더링된다. 부모 컴포넌트가 리렌더링되었으니 자식 컴포넌트인 TodoList 컴포넌트가 리렌더링되고, 그 안의 모든 컴포넌트들이 리렌더링된 것이다. 하나의 항목을 체크한 것인데 나머지 2499개의 항목이 모두 리렌더링되었기 때문에 애플리케이션에 지연이 발생. 이럴 때 컴포넌트 리렌더링 성능을 최적화하는 작업을 해야한다. 

즉, 리렌더링이 불필요할 때 리렌더링을 방지하는 것.

그래서

React.memo를 사용하여 컴포넌트 성능 최적화
컴포넌트의 리렌더링을 방지할 때는 7장에서 배운 shouldComponentUpdate라는 라이프사이클을 사용하면 된다. 

함수형 컴포넌트에서는 라이프사이클 메서드를 사용할 수 없기 때문에 React.memo라는 함수를 사용합니다. 

컴포넌트의 props가 바뀌지 않았다면, 
리렌더링하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능을 최적화할 수도 있습니다.

React.memo의 사용법은 컴포넌트를 만들고 나서 감싸면 됩니다. 
TodoListItem 컴포넌트에 React.memo를 적용합시다. 
적용 시 todo, onRemove, onToggle이 바뀔 때만 리렌더링합니다.
 */


/*
React.memo를 사용하는 것만으로 컴포넌트 최적화가 끝나지 않습니다. 
현재 프로젝트에서는 todos 배열이 업데이트되면 onRemove와 onToggle 함수도 새롭게 바뀌기 때문입니다. 

onRemove와 onToggle 함수는 배열 상태를 업데이트하는 과정에서 최신 상태의 todos를 참조합니다. 

때문에 todos 배열이 바뀔 때마다 함수가 새로 만들어집니다. 
이렇게 함수가 계속 만들어지는 상황을 방지하는 방법은 두 가지입니다. 

첫 번째 방법은 useState의 함수형 업데이트 기능을 사용하는 것이고, 
두 번째 방법은 useReducer를 사용하는 것입니다.

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

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
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

export default BeSlow;
