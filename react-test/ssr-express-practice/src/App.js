// import React from 'react';
// import { Route } from 'react-router-dom';
// import Menu from './components/Menu';
// import RedPage from './pages/RedPage';
// import BluePage from './pages/BluePage';
//
// const App = () => {
//   return (
//       <div>
//         <Menu />
//         <hr />
//         <Route path="/red" component={RedPage} />
//         <Route path="/blue" component={BluePage} />
//       </div>
//   );
// };
//
// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter 및 Routes를 추가로 가져옴
// import Menu from './components/Menu';
// import RedPage from './pages/RedPage';
// import BluePage from './pages/BluePage';
//
// const App = () => {
//     return (
//         <Router> {/* Router 컴포넌트로 전체를 감싸줌 */}
//             <div>
//                 <Menu />
//                 <hr />
//                 <Routes> {/* Routes 컴포넌트 안에 Route 컴포넌트들을 위치시킴 */}
//                     <Route path="/red" element={<RedPage />} /> {/* element 속성을 사용하여 컴포넌트를 지정 */}
//                     <Route path="/blue" element={<BluePage />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// };
//
// export default App;

//App.js


import React from 'react';
import { Routes, Route } from 'react-router-dom'; // BrowserRouter import 제거
import Menu from './components/Menu';
import RedPage from './pages/RedPage';
import BluePage from './pages/BluePage';

const App = () => {
    return (
        <div>
            <Menu />
            <hr />
            <Routes> {/* Routes 컴포넌트 안에 Route 컴포넌트들을 위치시킴 */}
                <Route path="/red" element={<RedPage />} /> {/* element 속성을 사용하여 컴포넌트를 지정 */}
                <Route path="/blue" element={<BluePage />} />
            </Routes>
        </div>
    );
};

export default App;