//  yarn global add serve
//   serve -s build
//server.js

const express = require('express');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const { StaticRouter } = require('react-router-dom/server');

// App 컴포넌트와 관련 컴포넌트 임포트
const App = require('./src/App');
const Menu = require('./src/components/Menu');
const RedPage = require('./src/pages/RedPage');
const BluePage = require('./src/pages/BluePage');

const app = express();

// 빌드된 클라이언트 사이드 자원 제공
app.use(express.static('build'));

app.get('*', (req, res) => {
    const context = {};

    // App 컴포넌트를 StaticRouter로 래핑하여 서버 사이드에서 라우팅 처리
    const appHTML = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    const fullPage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React App</title>
            <link href="/styles.css" rel="stylesheet">
        </head>
        <body>
            <div id="root">${appHTML}</div>
            <script src="/bundle.js"></script>
        </body>
        </html>
    `;

    res.send(fullPage);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});