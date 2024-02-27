# 9장. 컴포넌트 스타일링
*2024/2/20 9장 정리*
* * *

리액트에서 컴포넌트 스타일링을 할 때는 각자의 상황에 맞는 다양한 방식을 사용할 수 있다.
* **일반 CSS**: 컴포넌트를 스타일링하는 기본 방식
* **Sass**: CSS 전처리기 중 하나로 확장된 CSS 문법을 사용
* **CSS Module** : CSS 클래스 이름끼리 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해주는 옵션
* **styled-components** : 스타일을 자바스크립트 파일에 내장시키는 방식(스타일을 작성함과 동시에 해당 스타일이 적용된 컴포넌트를 만들수 있게 해준다.)



## BEM 네이밍 (BEM Naming)
### Docs
https://getbem.com/naming/
### 장점
1. 목적과 기능을 명확히 전달한다.
2. 요소의 구조를 효율적으로 전달한다.
3. css 명시도를 항상 낮은 수준으로 유지하기 떄문에 구체성으로 인한 코드의 길어짐을 방지할 수 있다.
   

### CSS Module

CSS Module은 CSS를 불러와서 사용할 때 클래스 이름을 고유한 값을 자동으로 만들어서 컴포넌트 스타일 클래스 이름이 중첩되는 현상을 방지해준다.
> `[파일 이름]_[클래스 이름]_[해시값]`<br>
해당 클래스는 스타일을 직접 불러온 컴포넌트 내부에서만 작동한다.

### styled-components
자바스크립트 파일 안에 스타일을 선언하는 방식 -> **CSS-in-JS** <br>   
(ex. emotion)

### 장점
1. 자바스크립트 파일 하나에 스타일까지 작성할 수 있어서, 따로 파일을 만들지 않아도 된다.
2. 빠른 런타임 성능
3. 객체 스타일 문법 지원
4. CSS props 기능 


### 단점
1. 설정이 복잡할 수 있다.
2. 태그가 많을 수록 가독성이 떨어진다.
```javascript
/* 이모션 사용 예시 */
   import { css } from '@emotion/react'

const color = 'white'

render(
  <div
    css={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `}
  >
    Hover to change color.
  </div>
)
```
```javascript
/* 스타일 컴포넌트 사용 예시 */

import styled from '@emotion/styled'

const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  margin-bottom: ${props => props.value ? '4px' : '2px'}
  &:hover {
    color: white;
  }
`render(<Button>This my button component.</Button>)
```

## Tagged 템플릿 리터럴
백틱


