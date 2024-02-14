## useState
함수 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해준다.
```
import React, { useState } from "react";
// JavaScript의 모듈 시스템을 사용해 React 패키지에서 useRef 훅을 불러오기

const [value, setValue] useState(0)
// 배열 구조 분해를 사용하지 않는다면 이 코드를 아래처럼 작성할 수 있다. (구조분해할당을 사용하지 않아도 된다.)
// const stateArray = useState(0);
// const value = stateArray[0];
// const setValue = stateArray[1];
```
- useState함수의 파라미터에 넣는 값이 기본값이 된다.
- 이 함수가 호출되면 배열을 반환한다. 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수다.
- 이 상태를 설정하는 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링 된다.
  <br/>
## useEffect
리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook이다.
> useEffect에 등록된 effect는 화면이 그려진 직후, 비동기로 실행된다.


### 마운트만 실행하고 싶을 때
useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 아래처럼 두 번째 파라미터로 빈 배열을 넣어준다.

```
useEffect(()=> {
	console.log('sdfdsf');
},[])
```

### 특정 값이 업데이트될 때만 실행하고 싶을 때
두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어준다.
```
useEffect(()=> {
	console.log('sdfdsf');
},[name])
// useState를 통해 관리하고 있는 상태를 넣어 주어도 되고, props로 전달 받은 값을 넣어 주어도 된다.
```

### cleanup함수
컴포넌트가 언마운트 되기 전이나 업데이트 되기 직전에 어떤 작업을 수행하고 싶다면 이 함수를 반환해 주어야 한다.
```
useEffect(()=> {
	console.log('sdfdsf');
    return () => {
    	console.log('cleanup')
    	console.log(name)        
    }
},[])
```
뒷정리 함수가 호출될 때는 업데이트되기 직전의 값을 보여준다.
오직 언마운트될 때만 cleanup 함수를 호출하고 싶다면 useEffect 함수의 두 번째 파라미터에 비어 있는 배열을 넣는다.
<br/>
## useReducer
useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 해주고 싶을 때 사용하는 Hook이다.

현재 상태, 업데이트를 위해 필요한 정보를 담은 액션값을 전달받아 새로운 상태를 반환하는 함수다.
리듀서 함수에서 새로운 상태를 만들 때는 **불변성**을 지켜 주어야 한다.


```
import React, { useReducer } from "react";

function reducer(state, action) { //1. 리듀서 함수 만들기 
  switch (action.type) {
    case "INCREMENT": 
      return { value: state.value + 1 }; //state의 value에 +1
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });
                                    // 리듀서 함수, 해당 리듀서 기본값
      // state : 현재 가리키고 있는 상태
      // dispatch : 액션을 발생시키는 함수

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button> 
      {/* dispatch(action) 리듀서 함수 호출 */}
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};
export default Counter;
```

인풋 상태 관리하기
인풋을 여러개 받아올 때 useState를 사용하면 여러개의 state가 생기는데,
useReducer를 사용해 e.target값 자체를 액션 값으로 사용해 관리하면 인풋이 많아져도 코드를 깔끔하게 유지할 수 있다.


```
import React, { useReducer } from "react";

function reducer(state, action) {
  // 리듀서 함수
  return {
    ...state, // 기존값 복사하기
    [action.name]: action.value,
    // input중 name을 key값으로 써서 입력된 값을 state의 해당 key에 해당하는 곳에 업데이트
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    nickname: "", //기본값 설정
  });

  const { name, nickname } = state; 
  // 아래를 구조분해할당 해서 줄인것!
  // const name = state.name;
  // const nickname = state.nickname;
  

  const onChange = (e) => {
    dispatch(e.target); //버튼에 직접 설정한 것과 다르게 함수를 따로 적용함
    //이벤트 객체가 지니고 있는 e.target값 자체를 액션값으로 사용
    //액션값을 받으면 reducer함수 호출
  };
  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름</b>
          {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

장점 : 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다.
<br/>
## useMemo
함수 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다.
쓸데없이 렌더링 계속 될 때, 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고
원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식

```
import React, { useState, useMemo } from "react";


const getAverage = numbers => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};


const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");


const onChange = e => {
    setNumber(e.target.value);
  };
  const onInsert = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };


// list 배열의 내용이 바뀔 때만 getAverage 함수가 호출
const avg = useMemo(() => getAverage(list), [list]);

return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

부모 컴포넌트가 재렌더링되면, 자식 컴포넌트들도 모두 자동으로 재렌더링된다.
- React.memo 를 사용하면, 자식이 전달받는 props가 변경되었을 때만 재렌더링 되도록 최적화할 수 있다.

<br/>

## useCallback
렌더링 성능을 최적화해야 하는 상황에서 사용한다.
이전에 생성된 함수를 재사용하여 동일한 함수 인스턴스를 반환한다.

함수를 그냥 선언하면 컴포넌트가 리렌더링될 때마다 새로 만들어진 함수를 사용하게 된다.
렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트의 개수가 많아지면 최적화해 주는 것이 좋다. 불필요한 함수 재생성을 방지하고, 컴포넌트의 분필요한 리렌더링을 줄일 수 있기 때문이다.

```
const onChange = useCallback(( ) => { 생성하고 싶은 함수 } , [ 이 값이 바뀌었을 때 함수 생성 ] );

// 두 번째 파라미터가 빈 배열일 경우 컴포넌트가 처음 렌더링될 때만 함수 생성
```

> useMemo가 계산된 '값'을 재사용한다면, useCallback은 계산된 함수를 기억하고 재사용한다.

<br/>

## useRef
함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해준다.
```
import { useMemo } from 'react';

const Average = () => {
	const inputEl = useRef(null);
    // useRef를 사용해 input 요소에 대한 참조를 생성
어쩌구
}

const onInsert = useCallback(e => {
	inputEl.current.focus();
  // 포커스 넘겨주기 
})

return (
	<div>
		<input ref={inputEL} /> 
        {/* input 요소에 ref 속성으로 생성한 참조를 연결 */}
	</div>
)
```
### 로컬 변수 사용하기
컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있다.
<br/>
리렌더링 할 필요가 없고, 변수 선언 시에는 다음 리렌더링 때 값이 초기화 되어 불편할 때 사용할 수 있다.
<br/>
ex. 스크롤 위치 등 기록<br/>

```
const App = () => {

    const nextId = useRef(4);
    
    const onCreate = () => {
        console.log(nextId.current); //4
        nextId.current += 1; // 5,6,7...
    }
}
```


