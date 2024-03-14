# 리액트 라우터로 SPA 개발하기
(SPA : Single Page Application)
<br/>
## 라우팅이란?
네트워크에서의 라우팅은 어떤 네트워크 안에서 통신 데이터를 보낼 대 최적의 경로를 선택하는 과정이고,<br/>
웹 애플리케이션에서는 사용자가 요청한 URL에 따라 알맞은 페이지를 보여주는 것,<br/>
브라우저를 통해서 웹 서버에 경로 요청을 하여 웹 문서를 받아와 랜더링하는 과정이라고도 할 수 있다.

## 싱글 페이지 애플리케이션이란?
싱글 페이지 애플리케이션은 하나의 페이지로 이루어진 애플리케이션이라는 의미다.
![](https://velog.velcdn.com/images/mimizl/post/f2bf1f2a-e48d-406b-8091-92300c14256c/image.png)


### 멀티 페이지 애플리케이션
데이터를 주고 받을 때마다 서버에 새 페이지를 요청한다.<br/>
페이지마다 해당하는 html 문서가 있어서 사용자가 다른 페이지로 이동할 때마다 새로운 html을 받아오고,
페이지를 로딩할 때마다 서버에서 CSS, JS, 이미지 파일 등의 리소스를 전달받아 브라우저 화면에 보여주었다.
각 페이지마다 다른 html 파일을 만들어 제공하거나 데이터에 따라 유동적인 html을 생성해 주는 템플릿 엔진을 사용하기도 했다.
사용자 인터랙션이 별로 없는 정적인 페이지들은 기존 방식이 적합하지만,
새로운 페이지를 보여줘야 할 때마다 서버 측에서 모든 준비를 한다면 서버 자원도, 트래픽도 많이 나올 수 있다.<br/>
예시 : http://www.ktword.co.kr/
### 싱글 페이지 애플리케이션
로직을 서버가 아닌 브라우저에서 실행한다.<br/>
html을 한번만 받아와서 웹 애플리케이션을 실행시킨 후, 이후에는 필요한 데이터만 받아와서 화면에 업데이트하는 것이다.
그래서 리액트 같은 라이브러리를 사용해서 뷰 렌더링을 사용자의 브라우저가 담당하도록 하고,
웹 애플리케이션을 브라우저에 불러와서 실행시킨 후에 사용자 인터랙션이 발생하면
필요한 부분만 자바스크립트를 사용하여 업데이트하는 방식을 사용하게 됐다.
새로운 데이터가 필요하면 서버 API를 호출해 필요한 데이터만 새로 불러와 애플리케이션에서 사용할 수 있게 됐다.<br/>

Gmail, Google Maps, Facebook, GitHubp 등이 SPA에 속한다.


### 라우팅 시스템
만약 링크를 사용했다면 전체 페이지가 교체되었겠지만, React Router를 사용함으로써 업데이트 된 부분만 새로 렌더링된다.


## 리액트 라우터 적용 및 기본 사용법
1. 프로젝트에 라우터 적용
   프로젝트에 리액트 라우터를 적용할 때는 src/index.js 파일에서 react-router-dom에 내장되어 있는
   BrowserRouter라는 컴포넌트를 사용해 감싸면 된다.
```
// src/index.js
...
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowerRouter>,
    document.getElementById('root')
);

```
2. 페이지 컴포넌트 만들기
```
// src/pages/Home.js
const About = () => {
    return (
        <div>
            <h1>홈</h1>
            <p>가장 먼저 보여지는 페이지</p>
        </div>
    )
}

// src/pages/About.js
const About = () => {
    return (
        <div>
            <h1>소개</h1>
            <p>라라라라라</p>
        </div>
    )
}
```
3. Route 컴포넌트로 특정 경로에 원하는 컴포넌트 보여주기
   사용자의 브라우저 주소 경로에 따라 우리가 원하는 컴포넌트를 보여주려면 Route라는 컴포넌트를 통해 라우트 설정을 해주어야 한다.
- Route 컴포넌트는 `<Route path="/주소 규칙" element={<보여 줄 컴포넌트 JSX/>} />` 처럼 사용한다.
- Route 컴포넌트는 Routes 컴포넌트 내부에서 사용되어야 한다.
```
// src/App.js
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}
            <Route path="/about" element={<About />}
        </Routes>
    )
}

```


### Link 컴포넌트를 사용하여 다른 페이지로 이동하는 링크 보여주기
a태그로 페이지를 이동할 때 브라우저에서는 페이지를 새로 불러오게 된다.
Link 컴포넌트도 a태그를 사용하지만 페이지를 새로 불러오는 것을 막고 History API를 통해 브라우저 주소의 경로만 바꾸는 기능이 내장되어 있다.
`<Link to="경로">링크 이름</Link>`처럼 사용한다.

## URL 파라미터와 쿼리스트링
### 파라미터
파라미터 : /example/df
<br/>
- 주소의 경로에 유동적인 값을 넣는 형태
- ID 또는 이름을 사용하여 특정 데이터를 조회할 때 사용한다.
- useParams라는 Hook을 사용하여 객체 형태로 조회할 수있다.
- URL 파라미터의 이름은 라우트 설정을 할 때 Route 컴포넌트의 path props를 통해 설정한다.

```
// Profile.js
import { useParams } from 'react-router-dom';

// data객체 : 예시 프로필 정보들을 key-value 형태로 담아두었다.
const data = {
    velopert: {
        name: '김민준',
        desc: '리액트를 좋아하는 개발자',
    },
    gildong: {
        name: '홍길동',
        desc: '고전 소설 홍길동전의 주인공',
    };
};

const Profile = () => {
    const params = useParams();
    const profile = data[params.username]; // username URL 파라미터를 통해 프로필을 조회
    return ( 
        <div>
            <h1>사용자 프로필</h1>
            {profile ? (
                <div>
                    <h2>{profile.name}</h2>
                    <p>{profile.desc}</p>
                </div>
            ) : (
                <p>존재하지 않는 프로필입니다.</p>
            )}
        </div>
    );
};

// App.js
    <Routes>
        ... 
        <Route path="/profiles/:username" element={<Profile />}
    </Roudes>
```
URL 파라미터는 /profiles/:username 같이 경로에 : 를 사용해 설정한다.
파라미터 여러개인 경우 /profiles/:username/:field 같은 형태로 설정할 수 있다.

<br/>
<br/>

### 쿼리스트링
쿼리스트링 : /example?page=1&keyword=react
<br/>
주소의 뒷부분에 ? 문자열 이후 key=value로 값을 정의하며 &로 구분하는 형태다.
<br/>
?를 지우고 & 문자열로 분리한 뒤 key와 value를 파싱하는 작업을 해야 하는데,
이 작업은 보통 npm 에서 qs 또는 querystring 패키지를 설치해 처리할 수 있다.
<br/>
키워드 검색, 페이지네이션, 정렬 방식 등  데이터 조회에 필요한 옵션을 전달할 때 사용한다.
<br/>
URL 파라미터와 달리 Route 컴포넌트를 사용할 때 별도로 설정해야 하는 것이 없다.

```
// 쿼리스트링 확인해보기 
// About.js

import { useLocation } from 'react-router-dom';

const About = () => {
    const location = useLocation();
    return(
        <div>
            <p>쿼리스트링 : {location.search} </p>
        </dlv>
    )
}

// pathname : 현재 주소의 경로 (쿼리스트링 제외)
// search: 맨 앞의 ? 문자를 포함한 쿼리스트링 값
// hash : 주소의 # 문자열 뒤 값
// state : 페이지로 이동할 때 임의로 넣을 수 있는 상태 값
// key : location 객체의 고유값, 초기에는 default이며 페이지가 변경될 때마다 고유의 값이 생성됨.

```


#### useSearchParams Hook을 사용해 쿼리스트링을 더욱 쉽게 다루는 방법
- 쿼리파라미터 조회 시 값은 무조건 문자열 타입! ture X 'true' O , 숫자는 parseInt
```
import { useSearchParams } from 'react-router-dom';

const About = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // useSearchParams는 배열 타입의 값을 반환한다.
    // 첫 번째 원소는 쿼리파라미터를 조회하거나 수정하는 메서드들이 담긴 객체를 반환한다.
    // 두 번째 원소 : 쿼리파라미터를 객체 형태로 업데이트할 수 있는 함수를 반환한다.
     
    const detail = serahParams.get('detail');
    const mode = searchParams.get('mode');
    // get 메서드 : 특정 쿼리 파라미터 조회, 없으면 null
    // set 메서드 : 특정 쿼리파라미터를 업데이트할 수 있다.
    
    const onToggleDetail = () => {
        setSearchParams({ mode, detail: detail === 'true' ? false : true });
    }
    
    const onIncreaseMode = () -> {
        const nextMode = mode === null ? 1 : parseInt(mode) + 1;
        setSearchParams({ mode: nextMode, detail });
    };
    
    return (
        <div>
            <h1>소개</h1>
            <p> detail: {detail}</p>
            <p> mode: {mode}</p>
            <button onClick={onToggleDetail}>Toggle detail</button>
            <button onClick={onIncreaseMode}>mode + 1</button>
        </div>
    );
};

export default About;

```

## 중첩된 라우트
하위에 있으면 자동으로 /로 구분되기 때문에 추가적인 / 를 path에 추가할 필요가 없어졌다.
### 컴포넌트를 만들고, App 컴포넌트에서 해당 페이지들의 라우트를 설정하는 단계
```
//컴포넌트 만들기1
//Articles.js
import { Link } from 'react-router-dom';

const Articles = () => {
    return (
        <ul>
            <li>
                <Link to="/articles/1">게시글 1</Link>
            </li>
            <li>
                <Link to="/articles/2">게시글 2</Link>
            </li>
            <li>
                <Link to="/articles/3">게시글 3</Link>
            </li>
        </ul>
    );
};

export default Articles;

---------------------------------------------------
//컴포넌트 만들기2
//Article.js
import { useParams } from 'react-router-dom';

const Article = () => {
    const { id } = useParams();
    return (
        <div>
            <h2>게시글 {id} </h2>
        </div>
    );
};

export default Article;

---------------------------------------------------
//해당 페이지들 라우트 설정
//App.js

import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Article from './pages/Article';
import Articles from './pages/Articles';
import Home from './pages/Home';
import Profile from './pages/Profile';

const App = () => {
    return (
        <Routes>
            <Route path="/" element{<Home />}>
            <Route path="/about" element{<About />}>
            <Route path="/Profiles/:usename" element{<Profile />}>
            <Route path="/articles" element{<Articles />}>
            <Route path="/articles/:id" element{<Article />}>
        </Routes>
    );
};

export defaul App;
```
- Home 컴포넌트에서 게시글 목록 페이지로 가는 링크를 추가한다.

### 중첩된 라우트를 사용해 게시글 목록 페이지에서 게시글 열었을 때 게시글 하단에 목록 보여주기


```
// App.js
...
const App = () => {
    return (
    ...
    <Routes>
        ... 
        // 아래처럼 수정
        <Route path="/articles" element={<Articles />}>
            <Route path=":id" element={<Article />}
        </Route>
    <Routes>
    )
}
```

- Articles 컴포넌트에 Outlet 컴포넌트 사용하기
  Outlet : Route의 children으로 들어가는 JSX 엘리먼트를 보여주는 역할을 한다.
```
// Articles.js

import { Outlet } from 'react-router-dom';

...

return(
    <div>
        <Outlet/>
    </div>
)
```
Outlet 컴포넌트는 Route의 children으로 들어가는 JSX 엘리먼트들을 보여준다.
Outlet 컴포넌트가 사용된 자리아 중첩된 라우트가 보여지게 된다.

### 공통 레이아웃 컴포넌트
중첩된 라우트와 Outlet은 페이지끼리 공통적으로 보여줘야 하는 레이아웃이 있을 때도 유용하게 사용할 수 있다.

### index props
Route 컴포넌트에는 index라는 props가 있다. 이 props는 path="/"와 동일한 의미를 가진다.
index props를 사용하면 상위 라우트의 경로와 일치하지만,
그 이후에 경로가 주어지지 않았을 때 보여지는 라우트를 설정할 수 있다.

## 리액트 라우터 부가 기능
리액트 라우터는 웹 애플리케이션에서 라우팅과 관련된 작업을 할 때 사용할 수 있는 유용한 API들을 제공한다.

### useNavigate
Link 컴포넌트를 사용하지 않고 다른 페이지로 이동해야 하는 상황에 사용하는 Hook
```
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();
}

const goBack = () => {
    navigate(-1);
    // navigate(-2) 는 뒤로 두 번, navigate(1)은 앞으로 한 번(뒤로가기 한 상태에서만)
}

const goArticles = () => {
    navigate('/articles', { replace: true });
    // replace 옵션을 사용하면 페이지를 이동했을 때 연재 페이지를 기록에 남기지 않는다.
}

return (
    <div>
        ...
        <button onClick={goBack}>뒤로가기</button>
        <button onClick={goArticles}>게시물 목록</button>
        ...
    </div>
) 
```

### NavLink
NavLink 컴포넌트는 링크에서 사용하는 경로가 현재 라우트의 경로와 일치하는 경우 특정 스타일 또는 CSS 클래스를 적용하는 컴포넌트다.
```
<NavLink
    style={{(isActive)} => isActive ? activeStyle : undefined}
/>

<NavLink
    className={{(isActive)} => 'active' ? activeStyle : undefined}
/>
```

```
import { Link, Outlet} from 'react-router-dom';

const Articles = () => {
    const activeStyle = {
        color: 'green',
        fontSize: 21,
    };
    
    return (
        <div>
            <Outlet/>
            <ul>
                <li>
                    <NavLink 
                        to ='/articles/1'
                        style={({isActive}) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 1
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to ='/articles/2'
                        style={({isActive}) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 2
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to ='/articles/3'
                        style={({isActive}) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 3
                    </NavLink>
                </li>
            </ul>
        </div>
  
    )
}

export default Articles;
```
위 코드는 아래처럼 리팩터링 할 수 있다.
```
import { Link, Outlet} from 'react-router-dom';

const Articles = () => {
    return (
        <div>
            <Outlet/>
            <ul>
                <ArticleItem id ={1}/>
                <ArticleItem id ={2}/>
                <ArticleItem id ={3}/>
            </ul>
        </div>
    )
};

const ArticleItem = ({id}) => {
    const activeStyle = {
        color: 'green',
        fontSize: 21,
    };  
} 
    
    return (
        <div>
            <Outlet/>
            <ul>
                <li>
                    <NavLink 
                        to ='/articles/1'
                        style={({isActive}) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 1
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to ='/articles/2'
                        style={({isActive}) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 2
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to ='/articles/3'
                        style={({isActive}) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 3
                    </NavLink>
                </li>
            </ul>
        </div>
  
    )
}

export default Articles;
```
### NotFound 페이지 만들기
*은 wildcard문자다. 아무 텍스트나 매칭한다. 상단에 위치하는 라우트들의 규칙을 모두 확인하고
일치하는 라우트가 없다면 이 라우트가 화면에 나타나게 된다.

### Navigate 컴포넌트
Navigate 컴포넌트는 컴포넌트를 화면에 보여주는 순간 다른 페이지로 이동을 하고 싶을 때 사용하는 컴포넌트다.
즉, 페이지를 리다이렉트하고 싶을 때 사용한다.
