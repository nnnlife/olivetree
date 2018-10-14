const express = require('express');
const passport = require('passport');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

const app = next({dev});

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(express.json());

    server.get('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(8080);
});


