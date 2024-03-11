// 13.4 URL 파라미터와 쿼리

// 페이지 주소를 정의할 때 유동적인 값을 전달해야 할 경우 두 가지로 나눌 수 있습니다. 파라미터와 쿼리입니다.

// 파라미터 예시 : /profile/velopert
// 쿼리 예시 : /about?details=true

// 일반적으로 파라미터는 특정 아이디 혹은 이름을 사용하여 조회할 때 사용하며,
//쿼리는 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용합니다.

// 13.4.1 URL 파라미터
// /profile/사용자명과 같은 형식으로 뒷부분에 유동적인 username 값을 넣어 줄 때,
//해당 값을 props로 받아 와 조회하는 방법에 대하여 알아보겠습니다.

//Profile.js

// import React from "react";
// import { useParams } from 'react-router-dom';

// const data = {
//   velopert: {
//       name: "김민준",
//       description: "리액트를 좋아하는 개발자",
//   },
//   gildong: {
//       name: "홍길동",
//       description: "고전 소설 홍길동전의 주인공",
//   },
// };

// const Profile = () => {
//     const { username } = useParams();
//     /* V5 ver: const Profile = ({ match }) => {
//   		const { username } = match.params; */
//     const profile = data[username];
//     if (!profile) {
//         return <div>존재하지 않는 사용자입니다.</div>;
//     }
//     return (
//         <div>
//           <h3>
//               {username}({profile.name})
//           </h3>
//           <p>{profile.description}</p>
//         </div>
//     );
// };

// export default Profile;

/*
V5과 V6, 그 차이점

V5에서는 파라미터를 받기 위해서 match 객체를 사용했는데,
V6에서는 useParams를 사용해야 합니다.
*/

// ###V5###
// import React from 'react';
// import { Link, Route } from 'react-router-dom';
// import Profile from './Profile';

// const Profiles = () => {
//   return (
//     <div>
//       <h3>사용자 목록:</h3>
//       <ul>
//         <li>
//           <Link to="/profiles/velopert">velopert</Link>
//         </li>
//         <li>
//           <Link to="/profiles/gildong">gildong</Link>
//         </li>
//       </ul>

//       <Route
//         path="/profiles"
//         exact
//         render={() => <div>사용자를 선택해 주세요.</div>}
//       />
//       <Route path="/profiles/:username" component={Profile} />
//     </div>
//   );
// };

// export default Profiles;

//###V6###
// import React from 'react';
// import { Link, Route, Routes } from 'react-router-dom';
// import Profile from './Profile';

// const Profiles = () => {
// return (
// <div>
//     <h3>사용자 목록:</h3>
//     <ul>
//     <li>
//         <Link to="/profiles/velopert">velopert</Link>
//     </li>
//     <li>
//         <Link to="/profiles/gildong">gildong</Link>
//     </li>
//     </ul>

// <Routes>
//     <Route path="/*" element={<div>유저를 선택해주세요.</div>} />
//     <Route path=":username" element={<Profile />} />
// </Routes>
// </div>
// );
// };

// export default Profiles;

/*
13.5 서브 라우트
서브 라우트는 라우트 내부에 또 라우트를 정의하는 것을 의미합니다.

방법은 간단합니다. 라우트로 사용되고 있는 컴포넌트의 내부에 Route 컴포넌트를 또 사용해 주면 됩니다.
*/

//Profiles.js

//###V5###
// import React from 'react';
// import { Link, Route } from 'react-router-dom';
// import Profile from './Profile';

// const Profiles = () => {
//   return (
//     <div>
//       <h3>사용자 목록:</h3>
//       <ul>
//         <li>
//           <Link to="/profiles/velopert">velopert</Link>
//         </li>
//         <li>
//           <Link to="/profiles/gildong">gildong</Link>
//         </li>
//       </ul>

//       <Route
//         path="/profiles"
//         exact
//         render={() => <div>사용자를 선택해 주세요.</div>}
//       />
//       <Route path="/profiles/:username" component={Profile} />
//     </div>
//   );
// };

// export default Profiles;

//###V6###
/*
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
return (
<div>
    <h3>사용자 목록:</h3>
    <ul>
    <li>
        <Link to="/profiles/velopert">velopert</Link>
    </li>
    <li>
        <Link to="/profiles/gildong">gildong</Link>
    </li>
    </ul>

    <Routes>
        <Route path="/*" element={<div>유저를 선택해주세요.</div>} />
        <Route path=":username" element={<Profile />} />
    </Routes>
</div>
);
};

export default Profiles;
*/

/*
V5와 V6, 그 차이점

V5에서는 <Profiles /> 컴포넌트를 렌더링한 뒤, Profiles 주소로 들어오면 render 안의 <div>를 렌더링하고, <Profiles /> 컴포넌트를 렌더링해 주었습니다.
V6에서 변동된 점은 다음과 같습니다.
- render => element, 화살표 함수 사용하지 않음.
- 하위 페이지가 있을 경우, 부모 Route에 /*을 추가해 주어야 합니다. 이는 exact의 역할을 대신합니다.
- path에서 부모 경로는 필요없으며, 파라미터만 작성해 줍니다. (:username)
- 앞서 언급했듯, <Route>들을 <Routes>로 싹 다 감싸줘야 합니다.
*/

//### V5 ###
/*
 import React from 'react';
 import { Link, Route } from 'react-router-dom';
 import Profile from './Profile';

const Profiles = () => {
  const activeStyle = {
    background: "black",
    color: "white",
  };
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/velopert" active>
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/gildong">
            gildong
          </NavLink>
        </li>
      </ul>

      <Route
        path="/profiles"
         exact
         render={() => <div>사용자를 선택해 주세요.</div>}
       />
       <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;
*/

//### V6 ###
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
//import { useParams } from 'react-router-dom';
import Profile from "./Profile";

const data = {
  velopert: {
    name: "김민준",
    description: "리액트를 좋아하는 개발자",
  },
  gildong: {
    name: "홍길동",
    description: "고전 소설 홍길동전의 주인공",
  },
};

const Profiles = () => {
  // const { username } = useParams();
  // /* V5 ver: const Profile = ({ match }) => {
  // 		const { username } = match.params; */
  // const profile = data[username];
  // if (!profile) {
  //   return <div>존재하지 않는 사용자입니다.</div>;
  // }

  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <NavLink
            to="./velopert"
            style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}
          >
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink
            to="./gildong"
            style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}
          >
            gildong
          </NavLink>
        </li>
      </ul>

      <Routes>
        <Route path="/*" element={<div>유저를 선택해주세요.</div>} />
        <Route path=":username" element={<Profile />} />
      </Routes>

      {/* <div>
        <h3>
          {username}({profile.name})
        </h3>
        <p>{profile.description}</p>
      </div> */}
    </div>
  );
};

export default Profiles;
