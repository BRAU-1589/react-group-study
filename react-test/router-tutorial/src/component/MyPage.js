import { Navigate } from 'react-router-dom';
import QueryComponent from "./Query";

/*
<Navigate> 컴포넌트를 사용하는 것은 사용자를 다른 경로로 리디렉션(바로 변경)하기 위한 방법.
이 코드 예제에서, MyPage 함수 컴포넌트는 isLoggedIn 변수를 통해 사용자의 로그인 상태를 확인합니다.

isLoggedIn이 false일 경우, 즉 사용자가 로그인하지 않은 상태일 때,
<Navigate to="/login" replace={true} />가 반환된다.
이는 사용자를 로그인 페이지(/login)로 리디렉션하라는 지시를 React Router에 제공.

<Navigate> 컴포넌트의 replace={true} 속성은 현재 페이지를 새 위치로 대체하는 것을 의미.
이렇게 하면 사용자가 브라우저의 뒤로 가기 버튼을 사용했을 때 리디렉션되기 전의 페이지로 돌아가지 않게 된다.
즉, 페이지 이력에서 현재 페이지가 새로운 대상으로 완전히 대체.

리디렉션이 "바로 바뀌는" 것은 isLoggedIn이 false로 평가될 때 React Router가 즉시 /login 경로로의 리디렉션을 실행하기 때문.
이러한 방식으로, 애플리케이션은 보안을 유지하고, 로그인하지 않은 사용자가 인증이 필요한 페이지에 접근하는 것을 방지할 수 있다.
 */

const MyPage = () => {
    const isLoggedIn = false;

    if (!isLoggedIn) {
        return <Navigate to = "/login" replace = {true} />;
    }

    return <div>마이페이지</div>
};



export default MyPage;