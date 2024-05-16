import React from "react";
import { connect } from "react-redux";
import Leader from "../components/Leader";
import { getPost, getUsers } from "../modules/leader";
import { useEffect } from "react";

const LeaderContainer = ({ getPost, getUsers, post, users }) => {
  useEffect(() => {
    getPost(1); // 액션 생성함수 실행('leader/GET_POST' 액션타입, payload: id=1)
    getUsers(); // 액션 생성함수 실행
  }, [getPost, getUsers]); // getPost ,getUsers에 변경이 있을 시 마다 호출
  return <Leader post={post} users={users} />;
};

export default connect(
  ({ leader }) => ({
    // props로 전달해 줄 post/users에, state의 leader에서 각각의 값 추출하여 전달
    post: leader.post,
    users: leader.users,
  }),
  {
    getPost, // props로, dispatch 함수 중 Post요청 액션생성함수 전달
    getUsers, // props로, dispatch 함수 중 Users요청 액션생성함수 전달
  }
)(LeaderContainer);

// connect 함수 : LeaderContainer 컴포넌트를 Redux 스토어에 연결해준다. 이를 통해 Redux의 상태와 액션을 LeaderContainer 컴포넌트에서 사용할 수 있게 됩니다.