# 13장. 리액트 라우터로 SPA 개발하기
*2024/3/11 12장 정리*
* * *

## 1. 라우팅'이란?
웹 애플리케이션에서 라우팅이라는 개념은 사용자가 요청한 url에 따라 알맞은 페이지를 보여주는 것을 의미한다.

> **라우팅 시스템** <br>
> 여러 페이지로 구성된 웹 애플리케이션을 만들 때 페이지 별로 컴포넌트들을 분리해가면서 프로젝트를 관리하기 위해 필요한 것이 라우팅 시스템이다.

1. 리액트 라우터 - 컴포넌트 기반 라우터 설정하는 라이브러리
2. Next.js - 리액트 프로젝트의 프레임워크, Create React App 처럼 다양한 기능 제공

## 2. 싱글 페이지 애플리케이션이란?
하나의 페이지로 이루어진 애플리케이션이다.

## 3. 리액트 라우터 사용법

### 3-1. 라우터 적용
아래 코드에 있는 BrowserRouter라는 컴포넌트로 감싸면, 웹 애플리케이션에 HTML5의 History API를 사용하여 페이지를 새로 불러오지 않고도 주소를 변경하고, 현재 주소의 경로에 관련된 정보를 리액트 컴포넌트에서 사용할 수 있도록 해준다.
https://developer.mozilla.org/en-US/docs/Web/API/History
```js
// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
```

### 3-2. Route 컴포넌트로 특정 경로에 원하는 컴포넌트 보여주기
```js
<Route path={"주소 규칙"} element="{보여줄 컴포넌트 JSX}" />
```
컴포넌트를 연결하려면 Route 태그를 사용해야하는데, 위 코드에 적힌 대로 설정한다.<br>
이전에 만들어두었던 페이지들을 연결하고자 하는 페이지에 import 시키고, Routes 태그로 아래와 같이 감싸준다.

```js
// App.js

import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/" element={<About/>}/>
        </Routes>
    )
}
```

### 3-3. Link 컴포넌트를 사용하여 다른 페이지로 이동하는 링크 보여주기
웹 페이지에서 링크 이동 시, a 태그를 사용한다. <br>
**그치만,** 리액트라우터를 사용하는 프로젝트에서는 페이지를 새로 불러오게 되는 a 태그를 사용하면 안된다. <br>
> Link 컴포넌트 역시  a 태그를 사용하기는 하지만, 페이지를 새로 불러오는 것을 막고, History API를 통해 브라우저 주소의 경로만 바꾸는 기능이 내장되어 있다.
```js
// Home.js
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>홈</h1>
            <p>가장 먼저 보여지는 페이지입니다.</p>
            <Link to={"/about"}>소개</Link>
        </div>
    )
}

export default Home;
```

## 4. URL 파라미터와 쿼리스트링

##### url 파라미터
주소의 경로에 유동적인 값을 넣는 형태(ID, 이름을 사용하여 특정 데이터를 조회 할 때 사용)
> 예시: /profile/velopert

#### 쿼리스트링
주소의 뒷부분에 ? 문자열 이후 key=value로 값을 정의하며 &로 구분하는 형태(키워드 검색, 페이지네이션, 정렬 방식 등 데이터 조회에 필요한 옵션을 전달할 때 사용)
> 예시: /articles?page=1&keyword=react

### 4-1. URL 파라미터
```js
// profile.js
import { useParams } from 'react-router-dom';

const data = {
    velopert: {
        name: '김민준',
        description: '리액트를 좋아하는 개발자'
    },
    gildong: {
        name: '홍길동',
        description: '고전 소설 홍길동전의 주인공'
    }
};

const Profile = () => {
    const params = useParams();
    const profile = data[params.username];
    
    return(
        <div>
            <h1>사용자 프로필</h1>
            {
                profile ? (
                    <div>
                        <h2>{profile.name}</h2>
                        <p>{profile.description}</p>
                    </div>
                ) : (
                    <p>존재하지 않는 프로필입니다.</p>
                )
            }
        </div>
    )
}
```
> useParams은 react-router-dom에서 제공하는 Hooks 중 하나로, 파라미터 값을 URL을 통해 넘겨받은 페이지에서 사용할 수 있도록 해주는 것을 말함.

```js
// App.js
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Profile from './pages/Profile';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profiles/:username" element={<Profile />} />
        </Routes>
    )
}
```

### 4-2. 쿼리스트링
react-router-dom에서 쿼리스트링 값을 가져올 수 있는 Hook 2가지
#### 1) useLocation()
여러 객체 중 search 프로퍼티가 쿼리스트링을 담고 있기 때문에, 그 값을 가져와서 사용할 수 있다.
* **pathname**: 현재 주소의 경로(쿼리스트링 제외)
* **search**: 맨 앞의?  문자를포함한 쿼리스트링 값
* **hash**: 주소의 # 문자열 뒤의 값(주로 History API가 지원되지 않는 구형 브라우저에서 클라이언트 라우팅 사용할 때 쓰는 해시 라우터에서 사용)
* **state**: 페이지로 이동할 때 임의로 넣을 수 있는 상태 값
* **key**: location 객체의 고유값, 초기에는 default이며 페이지가 변경될 때마다 고유의 값이 생성됨
```js
const location = useLocation();
```

#### 2) useSearchParams()
다양한 메서드를 제공해 원하는 값을 가져올 수 있게 하는 훅이다.
배열 타입의 값을 반환하며, 첫 번째 원소는 쿼리파라미터를 조회하거나 수정하는 메서드들이 담긴 객체를 반환한다.
* get 메서드를 통해 특정 쿼리파라미터를 조회
* set 메서드를 통해 특정 쿼리파라미털르 업데이트 (조회 시 쿼리파라미터가 존재하지 않으면 null 반환)
* 두번째 원소는 쿼리파라미터를 객체 형태로 업데이트할 수 있는 함수를 반환
* 쿼리파라미터를 조회할 때 문자열 타입이기 떄문에 불리언 값 경우, 따옴표로 감싸고 숫자는 parseInt로 변환해야함
```js
const [searchParams, setSearchParams] = useSearchParams();
```

## 5. 중첩된 라우트
```js
//Articles.js
//...import 생략
const Articles = () => {
    return(
        <ul>
            <li>
                <Link to={"/articles/1"}>게시글1</Link>
            </li>
            <li>
                <Link to={"/articles/2"}>게시글2</Link>
            </li>
            <li>
                <Link to={"/articles/3"}>게시글3</Link>
            </li>
        </ul>
    )
}
export default Articles;

// App.js
//...import 생략
function App() {

    return (
        <div className="App">

            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/About'} element={<About/>}/>
                <Route path={'/profiles/:username'} element={<Profiles/>}/>
                <Route path={'/articles'} element={<Articles/>}/>
                <Route path=":id" element={<Article/>}/>
            </Routes>
        </div>
    );
}
export default App;

```

#### Outlet 사용한 중첩된 라우터 형태
아래 코드처럼 중접된 라우트를 활용하면 컴포넌트를 한번만 사용해도 되는 장점이 있다.
```js
// Articles.js
// ...import 생략
const Articles = () => {
    return(
        <div>
            <Outlet/>
            <ul>
                <li>
                    <Link to={"/articles/1"}>게시글1</Link>
                </li>
                <li>
                    <Link to={"/articles/2"}>게시글2</Link>
                </li>
                <li>
                    <Link to={"/articles/3"}>게시글3</Link>
                </li>
            </ul>
        </div>

    )
}

export default Articles;

// App.js
//...import 생략
function App() {

    return (
        <div className="App">

            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/About'} element={<About/>}/>
                <Route path={'/profiles/:username'} element={<Profiles/>}/>
                <Route path={'/articles'} element={<Articles/>}>
                    <Route path=":id" element={<Article/>}/>
                </Route>

            </Routes>


        </div>
    );
}


export default App;

```


#### index props
```js
<Route index element={<Home/>}/>
```
path="/" 와 동일한 의미를 가지는 index라는 props이다. <br>
index prop을 사용하면 상위 라우트의 경로와 일치하지만, 그 이후에 경로가 주어지지 않았을 때 보여지는 라우트를 설정할 수 있다.


## 6. 리액트 라우터 부가 기능
리액트 라우터는 웹 애플리케이션에서 라우팅 관련 작업을 할 때 사용할 수 있는 유용한 API들을 제공한다.

### 6-1. useNavigate
Link 컴포넌트를 사용하지 않고 다른 페이지로 이동해야하는 상황에 사용하는 Hook.
```js
import {useNavigate} from 'react-router-dom';
const Layout = () => {
    const navigate = useNavigate();
    const goBack = () => {
        //이전 페이지로 이동
        navigate(-1)
    }
    const goArticles = () => {
        // articles 경로로 이동
        navigate('/articles')
        
        //replace 옵션 활용
        navigate('/articles', { replace: true});
    }
}
```
위 코드에서 replace 옵션 사용 시, 페이지 이동할 때 현재 페이지를 페이지 기록에 남기지 않는다.

### 6-2. NavLink
링크에서 사용하는 경로가 현재 라우트의 경로와 일치하는 경우 특정 스타일 또는 CSS 클래스를 적용하는 컴포넌트.
```js
import {NavLink, Outlet} from "react-router-dom";

const Articles = () => {
    const activeStyle = {
        color: 'green',
        fontSize: 21
    }
    return(
        <div>
            <Outlet/>
            <ul>
                <ArticleItem id={1}/>
                <ArticleItem id={2}/>
                <ArticleItem id={3}/>
            </ul>
        </div>

    )
}
const ArticleItem = ({ id }) => {
    const activeStyle = {
        color: 'green',
        fontSize: 21
    }
    return (
        <li>
            <NavLink to={`/articles/${id}`} style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                게시글 {id}
            </NavLink>
        </li>
    )
}
export default Articles;
```

#### 결과
![img](./img/13-img-1.png)

### 6-3. NotFound 페이지 만들기
페이지를 찾을 수 없을 때 나타나는 페이지.
```js
//NotFound.js

const NotFound = () => {
    return(
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 64,
                position: 'absolute',
                width: '100%',
                height: '100%'
            }}>
            404
        </div>
    )
}
export default NotFound;

//App.js
function App() {

    return (
        <div className="App">
            <Routes>
                // ...Route 생략
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </div>
    );
}
export default App;
```
`*` 라는 문자는 아무 텍스트나 매칭한다는 뜻으로, URL에 지정되지 않는 텍스트 입력 시 화면을 출력한다.

### 6-4. Navigate 컴포넌트
컴포넌트를 화면에 보여주는 순간 다른 페이지로 이동하고 싶을 때 사용하는 컴포넌트<br>
ex) 사용자의 로그인이 필요한 페이지인데, 로그인을 안했을 때 로그인 페이지로 이동

```js
//Login.js
const Login = () => {
    return  <div>로그인 페이지</div>
}
export default Login;


//MyPage.js
import {Navigate} from "react-router-dom";

const MyPage = () => {
    const isLoggedIn = false;

    if(!isLoggedIn) {
        return <Navigate to={'/login'} replace={true}/>
    }

    return <div>마이 페이지</div>
}
export default MyPage
```
> isLoggedIn은 false라는 고정 값을 가지고 있다. 이 값이 로그인 상태에 따라 true or false로 바뀌게 된다면?<br>
> 페이지 이동할 때 현재 페이지를 기록에 남기지 않기 때문에 이동 후 뒤로가기를 눌렀을 때 두페이지 전의 페이지로 이동하기 때문에, 로그인 페이지로 이동하게 된다.

```js
function App() {

    return (
        <div className="App">

            <Routes>
                // ...Route 생략
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/mypage'} element={<MyPage/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
```

