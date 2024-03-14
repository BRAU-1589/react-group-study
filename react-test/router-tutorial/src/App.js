/*
라우팅 :
다른 주소에 다른 화면을 보여 주는 것

- 라우팅 라이브러리에는 리액트 라우터(react-router), 리치 라우터(reach-router), Next.js 등 여러 가지가 있다.
- 그중 본 교재는 가장 자주 사용되는 리액트 라우터를 사용한다.
- 이는 클라이언트 사이드에서 이루어지는 라우팅을 아주 간단하게 구현하게 돕습니다.
- 또한 서버 사이드 렌더링을 돕는 컴포넌트를 제공합니다.
*/

/*
13.1.1 SPA의 단점
SPA를 이용해 개발할 경우 발생 혹은 예상되는 단점과 해결책은 아래와 같습니다.

앱의 규모에 비례해 커지는 자바스크립트 파일 : 불필요한 페이지 로딩
코드 스플리팅으로 트래픽과 로딩 속도 개선 가능
자바스크립트를 사용하지 않는 일반 크롤러에서 해당 페이지 정보를 제대로 수집하지 못함
서버 사이드 렌더링으로 개선 가능
자바스크립트가 실행 될 때 까지 빈 페이지를 보일 수 있음
서버 사이드 렌더링으로 개선 가능
*/

import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import About from "./component/About";
import Home from "./component/Home";
import Profiles from "./Profiles";
import QueryComponent from "./component/Query";
import MyPage from "./component/MyPage";

const App = () => {
  return (
    <div>
        <ul>
            <li>
                <Link to="/">홈</Link>

                {/*
            13.2.5 Link 컴포넌트를 사용하여 다른 주소로 이동하기

            Link 컴포넌트는 클릭하면 다른 주소로 이동시켜 주는 컴포넌트.
            일반 웹 어플리케이션에서는 a 태그에 해당하는 기능입니다.

            Link 컴포넌트는 다음과 같이 사용합니다. 
            이는 v5와 v6 버전에서 모두 동일하게 적용합니다.

            <Link to="주소">내용</Link>
          */}
            </li>
            <li>
                <Link to="/about">그룹스터디 소개</Link>
            </li>
            <li>
                <Link to="/profile">전체 프로필</Link>
            </li>
            <li>
                <Link to="/eyeg?name=InyoungChoi">쿼리스트링 - 최인영</Link>
            </li>
            <li>
                <Link to="/eyeg?name=eyeg">쿼리스트링 - eyeg</Link>
            </li>
            <li>
                <Link to="/mypage">로그인</Link>
            </li>
        </ul>
        <hr/>
        <Routes>
            <Route path="/" element={<Home/>} exact={true}/>
            <Route path="/about" element={<About />} />
        <Route path="/profile/*" element={<Profiles />} />
        {/*// v6 버전에서 변동됨*/}
        {/*// v5: <Route path="/profile/:username" component={Profile} />*/}
        {/* 
        V5과 V6, 그 차이점 1
        
        V5에서 달라진 점은 component가 element로
        변경되었다는 점입니다. V6에서 Route 컴포넌트를 사용하는 규칙은 다음과
        같습니다.

        <Route path="주소규칙" element={<보여 줄 컴포넌트 />} />

        V5과 V6, 그 차이점 2
        
        기존 V5에서는 Route를 각각 작성해 주어도 문제가
        없었습니다. 단, V6에서는 Route들을 Routes로 감싸주지 않으면 오류가
        발생합니다. 
        */}

        {/*
        V5과 V6, 그 차이점 3

        V5에서는 <Route path={['/about', '/info']} ~> 등,  path를 props 배열로 설정해 줄 수 있었지만,
        V6으로 업데이트가 된 후에는 path의 경로가 문자열이어야만 합니다.

        즉, path를 props 배열로 사용하였던 기존 방식은 사용하지 못하게 되었습니다.
        */}

        {/* 
        V5와 V6, 그 차이점 4
        
        V5에서는 username 값을 조회하기 위해 /:username 만 사용해도 되었지만, 
        V6에서는 username 값을 조회하기 위해서는 /:username 뒤에 /*를 붙여 주어야 합니다. (ex: ../:username/*) 
        */}

          <Route path="/eyeg?" element={<QueryComponent />} />
          <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
};

export default App;
