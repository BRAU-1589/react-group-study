//app.js

import React from "react";
import { Route, Routes, Link } from "react-router-dom";  //13.2.5 Link 컴포넌트를 사용하여 다른 주소로 이동하기 
import About from "./component/About";
import Home from './component/Home';
import Profile from './Profile';



/*
13.2.5 Link 컴포넌트를 사용하여 다른 주소로 이동하기

Link 컴포넌트는 클릭하면 다른 주소로 이동시켜 주는 컴포넌트입니다. 
일반 웹 어플리케이션에서는 a 태그에 해당하는 기능입니다.

Link 컴포넌트는 다음과 같이 사용합니다. 이는 v5와 v6 버전에서 모두 동일하게 적용합니다.

<Link to="주소">내용</Link>
*/



const App = () => {

  return (
    <div>
      <ul>
        <li>
          <Link to='/'>홈</Link>{' '}
          {/*13.2.5 Link 컴포넌트를 사용하여 다른 주소로 이동하기 */}
        </li>
        <li>
          <Link to='/about'>소개</Link>
        </li>

        <li>
          <Link to='/profile/velopert'>velopert 프로필</Link>
        </li>
        <li>
          <Link to='/profile/gildong'>gildong 프로필</Link>
        </li>

        <li>
          <Link to='/profile/'>프로필</Link>
        </li>
      </ul>
      <hr />

      <Routes>
        <Route path='/' element={<Home />} exact={true} />
        <Route path='/about' element={<About />} />
        <Route path='/profile/:username/*' element={<Profile />} />
        {/*// v6 버전에서 변동됨 // v5:{' '}*/}
        {/*v5: <Route path='/profile/:username' component={Profile} />*/}

        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;


/*
V5과 V6, 그 차이점

V5에서 달라진 점은 component가 element로 변경되었다는 점입니다.
V6에서 Route 컴포넌트를 사용하는 규칙은 다음과 같습니다.

<Route path="주소규칙" element={<보여 줄 컴포넌트 />} />




V5과 V6, 그 차이점

기존 V5에서는 Route를 각각 작성해 주어도 문제가 없었습니다.
단, V6에서는 Route들을 Routes로 감싸주지 않으면 오류가 발생합니다.

*/

/*
13.3 Route 하나에 여러 개의 path 설정하기

Route를 두 번 사용하여 Route 하나에 여러 개의 path를 설정할 수 있습니다.

 

V5과 V6, 그 차이점
V5에서는 <Route path={['/about', '/info']} ~> 등,  path를 props 배열로 설정해 줄 수 있었지만,
V6으로 업데이트가 된 후에는 path의 경로가 문자열이어야만 합니다.

즉, path를 props 배열로 사용하였던 기존 방식은 사용하지 못하게 되었습니다.
*/



/*
V5와 V6, 그 차이점

V5에서는 username 값을 조회하기 위해 /:username 만 사용해도 되었지만,
V6에서는 username 값을 조회하기 위해서는 /:username 뒤에 /*를 붙여 주어야 합니다. (ex: ../:username/*)
*/