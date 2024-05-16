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


import React from 'react';
import { createRoot } from 'react-dom/client'; // createRoot를 가져옴
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

// document.getElementById('root')에 대한 참조를 저장
const rootElement = document.getElementById('root');
// createRoot를 사용하여 root에 대한 참조를 생성
const root = createRoot(rootElement);

// root.render를 사용하여 App 컴포넌트를 렌더링
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

//serviceWorker.unregister();

