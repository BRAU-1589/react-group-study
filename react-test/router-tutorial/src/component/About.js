// import React from 'react';

// const About = () => {
//   return (
//     <div>
//       <h1>소개</h1>
//       <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
//     </div>
//   );
// };

// export default About;





/*
13.4.2 URL 쿼리
이번에는 About 페이지에서 쿼리를 받아 오겠습니다.
*/


//About.js

//###V5###
// import React from "react";
// import qs from "qs";

// const About = ({ location }) => {
//   const query = qs.parse(location.search, {
//     ignoreQueryPrefix: true, // 이 설정을 통해 문자열 맨 앞의 ?를 생략합니다.
//   });
//   const showDetail = query.detail === "true"; // 쿼리의 파싱 결과 값은 문자열입니다.
//   return (
//     <div>
//       <h1>소개</h1>
//       <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
//       {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
//     </div>
//   );
// };

// export default About;

//###V6###
import React, { useMemo } from "react";
import { useLocation } from "react-router";

function useQuery(){
    const {search} = useLocation();
    return useMemo(()=> new URLSearchParams(search), [search])
    }

    const About = () => {

    let query = useQuery();
    const showDetail = query.get('detail') ==='true'
    return (
        <div>
        <h1>소개</h1>
        <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
        {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
        </div>
    );
};
export default About;

/*
위와 같이 코드를 작성할 경우, ../about?detail=true 으로 접속하였을 때 detail 값을 true로 설정하셨군요! 라는 문구가 나타나는 것을 볼 수 있습니다.
*/
 

/*
V5와 V6, 그 차이점

V5에서는 라우트 컴포넌트에게 전달되는 location 객체에 있는 search 값에서 Query를 읽을 수 있었고,
문자열을 객체 형태로 변환하기 위하여 qs라는 라이브러리를 사용했습니다.
V6부터는 location 객체가 사라진 듯하며, useLocation을 사용해야 합니다.
*/