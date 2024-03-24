/*
import React from 'react';
import SpaceshipControl from './components/SpaceshipControl';

function App() {
  return (
    <div>
      <h1>삼체 우주선 컨트롤 센터</h1>
      <SpaceshipControl />
    </div>
  );
}

export default App;
*/

//App.js
import React from 'react';
import { SpaceshipProvider } from './conponents-context-api/SpaceshipContext';
import SpaceshipControl from './conponents-context-api/SpaceshipControl';

function App() {
  return (
    <SpaceshipProvider>
      <div>
        <h1>삼체 우주선 컨트롤 센터(context-api 업데이트)</h1>
        <SpaceshipControl />
      </div>
    </SpaceshipProvider>
  );
}

export default App;