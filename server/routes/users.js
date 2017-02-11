"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userSchema = require("./../schemas/user");
const User = mongoose.model('User', userSchema);

/* GET users listing. */
router.get('/all', (req, res, next) => {
    User.getAll((err, result) => {
        res.json(result);
    });
});

router.put('/new', (req, res, next) => {
    User.addOne(req, (err, result) => {
        res.json(result);
    });
});

module.exports = router;