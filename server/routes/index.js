"use strict";

const express = require('express');
const router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get('/', (req, res, next) => {
    //res.render('index', {title: 'Payments'});
    fs.readFile("./web-app/index.html", (error, file) => {
        res.send(file.toString());
    });
});

module.exports = router;