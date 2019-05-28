require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

(async () => {
    // Database
    const database = require('./model/database');
    await database.db.authenticate();
    await database.initialize((!!process.env.UPDATE_DB) ? process.env.UPDATE_DB.toUpperCase() === 'TRUE' : false);

    // HTTP Server
    app.set('trust proxy', 'loopback, linklocal, uniquelocal');
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.set('trust proxy', 'loopback, linklocal, uniquelocal');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', require('./routes/index'));

    // Error Pages
    app.use(function (req, res, next) {
        res.status(404).send({
            status: 404,
            statusText: 'Not Found',
            errors: []
        });
    });

    app.use(function (error, req, res, next) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            errors: []
        });
    });
})();


module.exports = app;
