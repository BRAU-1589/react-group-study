# 11장. 컴포넌트 성능 최적화
*2024/3/4 11장 정리*
* * *

#### 컴포넌트 리렌더링 발생 원인
1. 자신이 전달받은 props가 변경될 때
2. 자신의 state가 바뀔 때
3. 부모 컴포넌트가 리렌더링될 때
4. forceUpdate 함수가 실행될 때

## 리렌더링이 불필요할 때 어떻게 방지하는지 알아보자.

### 1. React.memo 사용
```js
import React from 'react';
// (...)

const TodoListItem = ({todo, onRemove, onToggle}) => {
    (...)
};

export default React.memo(TodoListItem);
```
React.memo 사용법은 위 코드처럼 컴포넌트를 만들고, 감싸 주면 된다.<br>
**TodoListItem** 컴포넌트는 todo, onRemove, onToggle이 바뀌지 않으면 리렌더링을 하지 않는다.

### 1-1. onToggle, onRemove 함수가 바뀌지 않게 하려면?
#### 1-1-1. useState의 함수형 업데이트 기능 사용
#### 1-1-2. useReducer 사용


## 2. 불변성에 중요성 
기존 데이터를 직접 수정하지 않고, 새로운 배열을 만든 다음 필요한 부분을 교체해주는 방식으로 구현한다.
```js
const array = [ 1, 2, 3, 4, 5];
const nextArrayBad = array; // 배열율 복사하는 것이 아니라 똑같은 배열을 가리킵니다
nextArrayBad[ 0] = 100 ;
console.log (array === nextArrayBad); // 완전히 같은 배열이기 때문에 true
const nextArrayGood = [ ...array]; // 배열 내부의 값을 모두 복사합니다
nextArrayGood[ 0] = 100 ;
console.log (array === nextArrayGood) ; // 다른 배열이기 때문에 false

const nextObjectBad = object; // 객체가 복사되지 않고, 똑같은 객체를 가리킵니다
nextObjectBad . value = nextObjectBad . value + 1;
console.log (object === nextObjectBad ); // 같은 객체이기 때문에 true
const nextObjectGood = {
... object, // 가존에 있던 내용을 모두 복사해서 넣습니다
value : object .value + 1 // 새로운 값을 덮어 씁니다
};
console . log (object === nextObjectGood); II
```

##### immer 라이브러리를 사용하는 경우
```js
const todos = [{ id: 1, checked: true}, { id: 2, checked: true}];
const nextTodos = [...todos];

nextTodos[0].checked = false;
console.log(todos[0] === nextTodos[0]); // 아직 똑같은 객체를 가리키고 있어서 true

nextTodos[0] = {
    ...nextTodos[0],
    checked: false
};
console.log(todos[0] === nextTodos[0]); // 새로운 객체를 할당해 주었기에 false
```
위 코드 처럼 객체 안에 있는 객체라면 불변성을 지키면서 새 값을 할당해야하므로,

```js
const nextComplexObject = {
    ...complexObject,
    objectInside: {
        ...complexObject.objectInside,
        enabled: false
    }
};
console.log(complexObject === nextComplexObject) // false 반환
console.log(complexObject.objectInside === nextComplexObject.objectInside); //false 반환
```
> 배열 혹은 객체의 구조가 복잡해지면 이렇게 불변성을 유지하면서 업데이트 하는 것이 까다로워지기 떄문에 <br>
> immer라는 라이브러리를 사용하면 한층 편리해진다고 한다.


## 3. react-virtualized 사용한 최적화
스크롤 되기 전에 보이지 않는 컴포넌트는 렌더링 하지 않고, 크기만 차지하게 할 수 있다. <br>
스크롤 하게 되면 해당 스크롤 위치에서 보여주어야 할 컴포넌트를 자연스럽게 렌더링 시키면서, <br>
낭비되는 자원을 쉽게 아낄 수 있게 된다.

