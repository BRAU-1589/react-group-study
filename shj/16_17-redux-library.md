# 16장. 리덕스 라이브러리 이해하기
*2024/4/2 16장 정리*
* * *
Redux DOCS <br>
https://redux.js.org/tutorials/fundamentals/part-1-overview

## 리덕스 정의 & 사용 이유
### 예측 가능
* 일관되게 동작
* 다양한 환경(클라이언트, 서버, 네이티브)에서 실행
* 테스트하기 쉬운 애플리케이션을 만들 수 있음
  
### 중앙집중식
애플리케이션의 상태와 로직을 중앙 집중화하면 <br>
**실행 취소/다시 실행, 상태 지속성** 등과 같은 강력한 기능이 사용 가능해짐
> #### 중앙 집중 방식
> 모든 처리기의 기억 장치가 한곳에 모여서 모든 데이터 처리가 중앙 컴퓨터 방식으로 처리되는 방식.

### 디버깅 가능
* 애플리케이션의 상태가 언제, 어디서, 왜, 어떻게 변경되었는지 쉽게 추적 가능
* Redux의 아키텍처를 사용하면 변경 사항을 기록하고, '시간 여행 디버깅'을 사용하고, 전체 오류 보고서를 서버로 전송 가능
* 
> #### 시간 여행 디버깅
> 특정 상태로 돌아갈 수 있게 해주는 특성인데,<br>
이는 애플리케이션의 특정 상호작용(interaction)  빠르게 테스트 할 수 있음.

### 유연함
* 모든 UI 레이어에서 작동
* 필요에 맞는 다양한 애드온 에코시스템을 갖추고 있습니다.
> #### 에드온
> 여러 웹 브라우저에서 쓰는 부가 기능 아우러 이르는 말.
> #### 에코 시스템
> 자연계의 생태계처럼 관련 기업이 협력하여 공생하는 시스템.

### 전역 상태만 관리하면 Context API 쓰면 되잖아?
1. 컴포넌트끼리 똑같은 상태를 공유할 때도 여러 컴포넌트를 거치지 않고 손쉽게 상태값을 전달하거나 업데이트 가능.
2. 리덕스를 사용하면 상태를 체계적으로 관리할 수 있고, 코드의 유지 보수성을 높여주며 미들웨어라는 기능을 제공하여 **비동기 작업**을 효율적으로 관리할 수 있기 때문임.

## 리덕스 데이터의 흐름
![img](./img/16-img-1.gif)

## 액션에 대하여
* 액션은 타입 필드가 있는 일반 자바스크립트 객체 
* 액션은 애플리케이션에서 발생한 일을 설명하는 이벤트 -> 리덕스에서 상태에 어떠한 변화가 필요하면 액션(action)이 발생
* 액션 객체는 type 필드를 반드시 갖고 있어야 함

### type
type 필드는 action의 이름을 기입한 문자열이어야 한다.(예: "todos/todoAdded").<br>
일반적으로 "도메인/이벤트명"과 같은 유형 문자열을 작성하는데,<br>
여기서 첫 번째 부분은 action에 속한 기능 또는 카테고리이고 두 번째 부분은 발생한 구체적인 일을 의미한다.

```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
const changeInputAction = {
  type:'change/changeInput',
  text:'안녕하세요'
}

//액션 생성 함수로 액션 객체를 만들어줄 때
/* 매번 액션 객체를 직접 작성하기 번거롭거나, 실수로 정보를 놓칠 때를 방지하기 위해 함수로 관리한다. */
function addTodo(data) {
    return {
    type:'add/todo',
    data    
    }
}
```

### Reducers 리듀서
* 리듀서는 현재 상태와 액션 객체를 수신하고, 필요한 경우 상태를 업데이트하는 방법을 결정한 후 <br>
새 상태인 (state, action) => newState를 반환하는 함수이다.
* 리듀서는 수신된 액션(이벤트) 유형에 따라 이벤트를 처리하는 이벤트 리스너로 생각할 수 있다.

#### 리듀서 사용 시 주의사항
1. 상태 및 액션 인수를 기반으로 새 상태 값만 계산해야 한다.
2. 기존 상태는 수정할 수 없다. 대신 기존 상태를 복사하고 복사된 값을 변경하는 방식으로 변경 불가능한 업데이트를 수행해야 한다.
3. 비동기 로직을 수행하거나 임의의 값을 계산하거나 기타 "부작용"을 유발해서는 안 된다.

## store 스토어
* Redux 스토어는 앱을 구성하는 상태, 액션, 리듀서를 한곳에 모아 제공한다.
* 한 개의 프로젝트는 단 하나의 스토어만 가질 수 있다.
* 현재 애플리케이션 상태를 내부에 보관한다.

### 디스패치
* 스토의 내장 함수 중 하나로, 액션을 발생시키는 것
* 디스패치 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 준다.

### 구독(subscribe)
* 스토어의 내장 함수 중 하나
* subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해 주면 이 리스너 함수가 액션이 디스패치되어 상태가 업데이트 될 때마다 호출된다.
```js
const listener = () => {
    console.log('상태가 업데이트 됨')
}
const unsubscribe = store.subscribe(listener);

unsubscribe()
```

## 리덕스의 세 가지 규칙
### 1. 단일 스토어
하나의 애플리케이션 안에는 하나의 스토어가 들어가는 것을 권장한다.(여러개 만드는 것이 가능하지만, 상태 관리가 복잡해질 수 있어서 지양한다.)

### 2. 읽기 전용 상태
리덕스 state는 읽기 전용이고, state 값을 업데이트 할 때 기존의 객체는 건드리지 않고 새로운 객체를 생성해주어야 한다.<br>
불변성을 유지 해야하는 이유는 내부적으로 데이터가 변경되는 것을 감지하기 위해서이다.

### 3. 리듀서는 순수한 함수
* 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받는다.
* 파라미터 외의 값에는 의존하면 안된다.
* 이전 상태는 절대로 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어서 반환한다.
* 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환해야 한다.


# 17장. 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기
## 리덕스를 작성할 때
### 액션 타입, 액션 생성 함수, 리듀서 코드를 작성
* 일반적인 구조로는 actions, constants, reducers라는 세 개의 데릭터리를 만들고, 그 안에 기능별로 파일을 하나씩 만드는 방식이다.<br>
actions / counter.js <br>
actions / todo.js<br>
constants / ActionTypes.js<br>
reducers / counter.js<br>
reducers / todos.js<br>
* Ducks 패턴 : 액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나에 몰아서 다 작성하는 방식이다.<br>
modules / couter.js<br>
modules / todos.js

## 리액트에 리덕스 사용하기
### 1. 스토어 만들기
```js
import { createStore } form 'redux';
import rootReducer form './modules';

const store = createStore(rootReducer);
```
### 2. Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용
이 컴포넌트를 사용할 대는 store를 props로 달아줘야한다.
```js
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
        <Provider store={store}>
          <App/>
        </Provider>
)
```

## 리덕스 편하게 사용하기
### redux-actions
* 액션 생성 함수를 더 짧은 코드로 작성할 수 있게 해준다.
* 리듀서를 작성할 때 switch문이 아닌 handleActions라는 함수를 사용할 수 있게 해준다.

#### 1. createAction
액션 생성 함수를 만들어주는 함수로, 직접 객체를 만들 필요가 없어 훨씬 간단하다.
* createAction을 사용하지 않았을 때
  Redux의 action 생성자를 하나씩 만들어야 함.
```js
const CHANGE_USER = 'user/CHANGE_USER';
export const change_user = user => ({type: CHANGE_USER, user})
```
* createAction을 사용했을 때 <br>
파라미터로 전달 받은 값을 객체에 넣어주는 단순한 패턴 즉, 단순 작업을 해결할 수 있음.
```js
import {createAction} from 'redux-actions';
const CHANGE_USER = 'user/CHANGE_USER'

export const change_user = createAction(CHANGE_USER, user => user);
```

#### 2. handleActions
리듀서를 간단하게 작성할 수 있다.
* handleActions을 사용하지 않았을 때
```js
const reducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_USER:
            return {
                ...state,
                user: action.user
            }
    }
}
```
* handleActions을 사용했을 때 <br>
  createAction()을 사용해서 기존 방식과 다른 payload를 써줘야한다. payload에 담은 값이 존재하게 된다.
```js
import { handleActions } from 'redux-actions';
const reducer = handleActions({
    [CHANGE_USER]: (state, action) => ({...state, user: action.user})
});
```
### immer
객체의 구조가 복잡해지거나 객체로 이루어진 배열을 다룰 경우, immer를 사용하면 훨씬 편리하게 상태를 관리할 수 있다.








