"use strict";

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");

require("./mongo").start();

const routes = require('./routes/index');
const users = require('./routes/users');
const payments = require('./routes/payments');
//const reports = require('./routes/reports');

const compression = require('compression'),
    errorHandler = require('errorhandler'),
    csrf = require('csurf'),
    passport = require('passport');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compression());
app.use(errorHandler()); // error handler

/*//additional security layer for posting of forms
const csrfProtection = csrf({
    cookie: true
});
const parseForm = bodyParser.urlencoded({
    extended: false
});*/

app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);
app.use('/payments', payments);
//app.use('/reports', reports);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
