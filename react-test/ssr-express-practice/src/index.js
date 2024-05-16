// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// //import * as serviceWorker from './serviceWorker';
// import { BrowserRouter } from 'react-router-dom';
//
// ReactDOM.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>,
//     document.getElementById('root')
// );
//
// //serviceWorker.unregister();



//index.js

// import React from 'react';
// import { createRoot } from 'react-dom/client'; // createRoot를 가져옴
// import './index.css';
// import App from './App';
// //import * as serviceWorker from './serviceWorker';
// import { BrowserRouter } from 'react-router-dom';
//
// // document.getElementById('root')에 대한 참조를 저장
// const rootElement = document.getElementById('root');
// // createRoot를 사용하여 root에 대한 참조를 생성
// const root = createRoot(rootElement);
//
// // root.render를 사용하여 App 컴포넌트를 렌더링
// root.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// );
//
// //serviceWorker.unregister();


//index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.hydrateRoot(
    document.getElementById('root'),
    <BrowserRouter>
        <App />
    </BrowserRouter>
);


//createRoot와 hydrateRoot는 React 18에서 도입된 API로, 각각 초기 렌더링과 서버 사이드 렌더링(SSR) 후
// 클라이언트 측 하이드레이션(hydration)을 위해 사용됩니다. 이 둘의 주요 차이점은 다음과 같습니다.

//createRoot
//용도: 클라이언트에서 React 애플리케이션을 처음으로 렌더링할 때 사용
//설명: createRoot는 React 애플리케이션의 루트 DOM 컨테이너를 생성
// React 18에서는 새로운 동시성 모드를 지원, 이 모드를 사용하려면 createRoot를 사용

/*
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
*/



//hydrateRoot
//용도: 서버 사이드 렌더링(SSR) 후 클라이언트 측에서 하이드레이션을 수행할 때 사용됩니다.
//설명: hydrateRoot는 이미 서버에서 렌더링된 HTML 마크업을 React 애플리케이션으로 하이드레이션
// 이를 통해 클라이언트 측에서 초기 로딩 시간을 줄이고, 서버에서 미리 렌더링된 콘텐츠를 재사용

/*
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
hydrateRoot(container, <App />);
*/



//createRoot: 클라이언트에서 애플리케이션을 처음 렌더링할 때 사용
//hydrateRoot: 서버 사이드 렌더링된 애플리케이션을 클라이언트에서 하이드레이션할 때 사용

//createRoot: React의 새로운 동시성 기능을 지원하며, 초기 렌더링에 최적화되어 있습니다.
//hydrateRoot: 이미 서버에서 생성된 HTML을 활용하여 하이드레이션을 통해 빠르게 클라이언트 측 상호작용을 가능


//createRoot: 빈 DOM 컨테이너에 React 컴포넌트를 렌더링합니다.
//hydrateRoot: 서버에서 렌더링된 HTML 마크업을 기반으로 React 컴포넌트를 하이드레이션하여 클라이언트 측 상호작용을 활성화합니다.

//createRoot는 클라이언트 측에서 처음으로 애플리케이션을 렌더링할 때 사용하고,
// hydrateRoot는 서버 사이드 렌더링된 애플리케이션을 클라이언트 측에서 하이드레이션할 때 사용합니다.
// 각 API는 각각의 목적에 맞게 최적화되어 있으며, React 18에서 동시성 모드와 SSR을 지원하기 위해 도입되었습니다.


//하이드레이션!

//하이드레이션(hydration)은 서버 사이드 렌더링(SSR)된 HTML 마크업을 클라이언트 측에서 React 애플리케이션으로 변환하는 과정
// 이 과정은 초기 페이지 로딩 시간을 줄이고 사용자 경험을 향상시키기 위해 사용됩니다. 하이드레이션을 통해 서버에서 생성된 정적인 HTML을 클라이언트 측에서 동적인 React 애플리케이션으로 전환

//하이드레이션의 동작 방식
//서버 사이드 렌더링(SSR):

//서버에서 React 컴포넌트를 렌더링하여 HTML을 생성합니다.
//이 HTML을 클라이언트에 전달
//사용자 브라우저는 서버에서 전달된 HTML을 받아 초기 페이지를 표시

//클라이언트 측 하이드레이션:

//클라이언트 측에서 React 라이브러리가 로드.
//hydrateRoot를 사용하여 서버에서 생성된 HTML을 React 컴포넌트로 변환합니다.
// React는 기존의 정적인 HTML 마크업을 재사용하면서 이벤트 핸들러와 상태를 React 컴포넌트에 연결합니다.
//이렇게 함으로써, 클라이언트 측에서 전체 페이지를 다시 렌더링하지 않고도 빠르게 상호작용이 가능한 상태로 전환됩니다.



//하이드레이션의 장점
//빠른 초기 로딩: 서버에서 미리 렌더링된 HTML을 사용하여 초기 페이지 로딩 속도가 빨라집니다.
//SEO 개선: 서버에서 생성된 HTML을 사용하므로 검색 엔진 크롤러가 콘텐츠를 쉽게 인덱싱할 수 있습니다.
//사용자 경험 향상: 클라이언트 측에서 전체 페이지를 다시 렌더링하지 않고도 빠르게 상호작용할 수 있습니다.

//하이드레이션 사용 예시
//서버 사이드 렌더링된 애플리케이션을 클라이언트 측에서 하이드레이션하는 코드는 다음과 같습니다.


//하이드레이션은 서버에서 미리 렌더링된 HTML을 클라이언트 측에서 React 애플리케이션으로 변환하여 초기 로딩 시간을 줄이고,
//상호작용을 빠르게 활성화하며, SEO를 개선하는 중요한 기술입니다. React 18에서는 hydrateRoot API를 통해 이 과정을 효율적으로 처리할 수 있습니다.




//Hydration
// 리액트 하이드레이션은 렌더링과 유사하게 사용되는 기술이다.
// 하지만 리액트 컴포넌트를 렌더링하기 위해 빈 DOM을 사용하는 대신, 모든 컴포넌트가 HTML로 렌더링 된, 이미 빌드된 DOM을 사용한다.\


//리액트를 통해 HTML에 이벤트 핸들러를 연결시켜 앱을 인터랙티브하게 만들 수 있다.
// 컴포넌트들을 렌더링하고 이벤트 핸들러를 연결하는 이 과정을 'hydration'이라 한다.
// 이는 '마른' HTML에 상호작용과 이벤트 핸들러로 '물'을 주는 것과 같다. 하이드레이션 후, 앱은 인터랙티브해져 클릭에 응답하게 된다.