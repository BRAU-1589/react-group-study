import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));


/*
* 이 예시에서 MainPage와 DetailPage는 React.lazy를 사용하여 동적으로 로드됩니다.
* 이렇게 함으로써 사용자가 실제로 해당 페이지를 방문할 때까지 해당 페이지의 스크립트를 로드하지 않습니다.
* 이는 초기 로드 시 필요한 자원의 양을 줄이고, 전체적인 로딩 속도를 향상시키는 데 기여합니다.

Suspense 컴포넌트는 페이지의 코드가 로드될 동안 보여질 대체 컴포넌트를 정의하며,
* 이는 사용자에게 로드 상태를 표시하여 더 나은 사용자 경험을 제공합니다.
* */