// src/server.js
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

const app = express();
const PORT = 3000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
    const context = {};
    const content = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SSR with React Router</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="/client_bundle.js"></script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
