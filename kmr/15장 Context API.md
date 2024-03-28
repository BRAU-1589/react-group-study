## Context API를 사용한 전역 상태 관리 흐름 이해하기
프로젝트 내에서 전역적으로 필요한 상태를 관리해야 하는 경우 **props**로 데이터를 전달하는데,
실무에서 많은 컴포넌트와 많은 데이터를 처리해야할 때 이 방식을 사용하면 매우 **복잡해서 유지보수성이 낮아질 가능성**이 있다.
그래서 **리덕스** 같은 상태 관리 라이브러리를 사용해 전역 상태 관리 작업을 더 편하게 처리하기도 하는데,
리액트 16.3 버전 업데이트 이후에는 **Context API**가 많이 개선되어, 이를 사용해 전역 상태를 손쉽게 관리할 수 있게 됐다.
<br/>
A : useState로 데이터를 관리하는 컴포넌트 : **Provider Component**<br/>
l<br/>
B<br/>
l<br/>
C<br/>
l<br/>
D :  A의 데이터를 바탕으로 UI를 그리는 컴포넌트 : **Consumer Component**<br/>

D가 A의 데이터에 곧바로(B,C를 거치지 않고) 접근하도록 해주는 게 Context API다!

## Context API 사용법 익히기
ContextAPI를 구성하는 세가지 구성요소가 있다.

- **CreateContext**: Context를 사용하기 위해 Context를 생성 하는 것
  (Context는 우리가 원하는 데이터를 저장하는 공간이라고 할 수 있다.)
- **Provider Component**: Context에 데이터를 저장 하는 컴포넌트
- **Consumer Component**: Context에 저장된 데이터를 읽어와서 사용 하는 컴포넌트

### Context.Provider
Provider는 context를 쓴 컴포넌트들에게 context의 변화를 알리는 역할을 한다.
value prop을 받아서 이 값을 하위에 있는 컴포넌트에게 전달한다.
provider 밑에 provider를 또 배치할 수도 있는데 이 경우 하위 provider 값이 우선시된다.

### Context.Consumer
context 변화를 구독하는 react 컴포넌트다. 함수 컴포넌트 안에서 context를 구독할 수 있다.
Context.Consumer의 children은 함수여야 한다. 이 함수는 context의 현재값을 받고 react 노드를 반환한다.

### 실습
[Context API 사용법 익히기](https://codesandbox.io/p/sandbox/15-1-8z65qj)

### 더 알아보기
![](https://velog.velcdn.com/images/mimizl/post/73bf26d8-35e2-46d6-a1a8-70ba5a2a3dfa/image.png)<br/>
매개변수(parameter)는 함수의 정의에서 전달받은 인수를 함수 내부로 전달하기 위해 사용하는 변수를 의미한다.<br/>
인수(argument)는 함수가 호출될 때 함수로 값을 전달해주는 값을 말한다.
인수를 통틀어 인자라고도 한다.

## 동적 Context 사용하기
### 실습
[새로워진 Context들을 프로젝트에 반영하기](https://codesandbox.io/p/sandbox/15-2-ttxk5p)

[색상 선택 컴포넌트 만들기](https://codesandbox.io/p/sandbox/15-3-jqvmlc)
### 더 알아보기
### Render Props
함수를 사용하여 컴포넌트 간에 데이터나 기능을 전달하는 패턴이다.<br/>
부모 컴포넌트는 자식 컴포넌트에게 함수를 전달하고, 자식 컴포넌트는 이 함수를 호출하여 데이터나 기능을 사용하는데 이를 통해 부모 컴포넌트와 자식 컴포넌트 간의 소통이 이루어진다.
<br/>
자식 컴포넌트에서는 함수를 호출하면서 필요한 데이터나 기능을 전달하고, 부모컴포넌트에서는 이러한 함수를 정의하여 제공한다.
<br/>
이 패턴을 사용하면 부모 컴포넌트와 자식 컴포넌트 간의 결합도를 낮출 수 있으며, 재사용성을 높일 수 있다.

#### {childre}은 누구냐
{children}은 리액트에서 특별한 props중 하나로, 부모 컴포넌트가 자식 컴포넌트를 포함할 공간이다.
자식 컴포넌트들은 부모 컴포넌트의 {children} 부분에 포함된다. 이를 통해 부모 컴포넌튼느 자식 컴포넌트를 동적으로 포함시킬 수 있다.

### 객체 비구조화 할당(구조 분해 할당, distructing)
먼저 구조 분해 할당은 주어진 자료의 구조를 분해해서 변수에 할당하는 기능이다.

객체에는 여러 개의 프로퍼티와 메서드가 있는데, 변수 이름은 프로퍼티나 메서드 이름을 똑같이 사용한다.
객체에는 순서가 없으므로 키 이름과 변수 이름이 같아야 해당 키를 찾아서 값을 가져올 수 있기 때문이다.
```javascript
const member = {
    name : 'kim',
    age : '6'
}

let {name:userName, age} = number
// member 객체에 있는 name 키의 값을 가져온 후 userName으로 할당해 새로운 변수 이름 사용하기
name // 'Kim'
age // 6

```
`프로퍼티 : name : 'kim' , name은 프로퍼티 키 kim은 프로퍼티 값`
`메서드 : test : function(n) {return 2 * n}`

## Consumer 대신
### static contextType
클래스 메서드에서도 Context에 넣어 둔 함수를 호출할 수 있다는 장점이 있다.<br/>
단점으로는 한 클래스에서 하나의 Context밖에 사용하지 못한다는 것이다.<br/>
그래서 useContext를 사용하는 쪽을 권장한다.
### useContext Hook
함수 컴포넌트에서 Context를 아주 편하게 사용할 수 있다. (함수형 컴포넌트에서만 사용 가능!)<br/>
children 함수를 전달하는 renderProps 패턴이 불편하다면, useContext Hook을 사용해 훨씬 편하게 Context 값을 조회할 수 있다.

#### 실습
[useContext Hook](https://codesandbox.io/p/sandbox/15-4-usecontext-hook-rjnx3r)


## Context를 사용하기 전에 고려할 것
context를 사용하면 컴포넌트를 재사용하기 어려워지므로 꼭 필요할 때만 써야한다!
