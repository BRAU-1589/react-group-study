import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BluePage from './components/BluePage';
import RedPage from './components/RedPage';

function App() {
    return (
        <Routes>
            <Route path="/blue" element={<BluePage />} />
            <Route path="/red" element={<RedPage />} />
        </Routes>
    );
}

export default App;