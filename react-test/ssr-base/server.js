import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// React 컴포넌트 정의
const App = () => <div>서버 사이드 렌더링 텍스트 등장.</div>;

// Express 서버 생성
const server = express();

server.get('/', (req, res) => {
    const initialContent = ReactDOMServer.renderToString(<App />);
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>리액트 서버사이드 렌더링 기초</title>
    </head>
    <body>
      <div id="root">${initialContent}</div>
    </body>
    </html>
  `);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//npm install -g @babel/node
// babel-node server.js