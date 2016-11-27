"use strict";

const express = require('express');
const router = express.Router();
const mongo = require("./../mongo");
const ObjectId = require('mongodb').ObjectId;

const COLLECTION_NAME = "reports";

router.get('/get', (req, res) => {
    const db = mongo.getDbConnection();
    const collection = db.collection(COLLECTION_NAME);

    //collection.insertOne(req.body, () => res.send({}));
});

module.exports = router;