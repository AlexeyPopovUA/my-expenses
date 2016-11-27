"use strict";

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send([
        {
            name: 'Lee Boonstra',
            email: "lee@example.com",
            phone: "555-111-1111"
        },
        {
            name: 'Olga Petrova',
            email: "olga@example.com",
            phone: "555-222-1111"
        },
        {
            name: 'Danny McLaughlin',
            email: "danny@example.com",
            phone: "555-333-1111"
        },
        {
            name: 'Ellen Fischer',
            email: "ellen@example.com",
            phone: "555-444-1111"
        }
    ]);
});

module.exports = router;