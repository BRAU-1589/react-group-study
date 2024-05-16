import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// 페이지 컴포넌트를 동적으로 로드하기 위해 lazy를 사용합니다.
const MainPage = lazy(() => import('./pages/MainPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));

function App() {
    return (
        <Router>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/detail" element={<DetailPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;



/*
* 동적 로드: MainPage와 DetailPage는 React.lazy를 통해 필요할 때만 로드됩니다.
* 이 방식은 사용자가 실제로 해당 페이지를 방문할 때까지 페이지 컴포넌트의 코드를 로드하지 않으므로 초기 로드 시간을 단축합니다.
Suspense: 동적으로 로드되는 컴포넌트가 준비되는 동안 사용자에게 보여줄 대체 UI를 정의합니다.
라우팅: Routes 및 Route 컴포넌트를 사용하여 각 URL 경로를 해당 컴포넌트와 연결합니다.
* */