// 13.4 URL 파라미터와 쿼리

// 페이지 주소를 정의할 때 유동적인 값을 전달해야 할 경우 두 가지로 나눌 수 있습니다. 파라미터와 쿼리입니다.

// 파라미터 예시 : /profile/velopert
// 쿼리 예시 : /about?details=true

// 일반적으로 파라미터는 특정 아이디 혹은 이름을 사용하여 조회할 때 사용하며,
//쿼리는 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용합니다.

// 13.4.1 URL 파라미터
// /profile/사용자명과 같은 형식으로 뒷부분에 유동적인 username 값을 넣어 줄 때,
//해당 값을 props로 받아 와 조회하는 방법에 대하여 알아보겠습니다.

import React from "react";
import { useParams } from "react-router-dom";

const data = {
  ciy: {
    name: "최인영",
    description: "리액트 라우터 테스트 중.",
    bgColor: "#ff7f00",
    color:"#f5f5dc"
  },
  kmr: {
    name: "김미리",
    description: "파주댁",
    bgColor: "#f5f5dc",
    color:"#000"
  },
  ohr: {
    name: "오혜림",
    description: "삼각지 다녀옴",
    bgColor: "#ff0000",
    color:"pink"
  },
  shj: {
    name: "석현정",
    description: "지구모양 대표",
    bgColor: "#B3E0ff",
    color:"rgba(161,113,255,0.56)"
  },
  sm2s: {
    name: "서문명수",
    description: "유학파",
    bgColor: "#800020",
    color:"#fff"
  },
};

const Profile = () => {
  const { username } = useParams();
  /* V5 ver: const Profile = ({ match }) => {
  		const { username } = match.params; */

  /*
V5과 V6, 그 차이점

V5에서는 파라미터를 받기 위해서 match 객체를 사용했는데,
V6에서는 useParams를 사용해야 합니다.
*/

  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  const profileStyle = {
    backgroundColor: profile.bgColor,
    color: profile.color,
    padding: '20px',
    borderRadius: '5px'
  };
  return (
      <div style={profileStyle}>
        <h3>
          {username}({profile.name})
        </h3>
        <p>{profile.description}</p>
      </div>
  );
};

export default Profile;
