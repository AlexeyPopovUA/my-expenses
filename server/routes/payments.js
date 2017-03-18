"use strict";

const express = require('express');
const router = express.Router();
const mongo = require("./../mongo");
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const PaymentSchema = require("./../schemas/payment");
const PaymentModel = mongoose.model('Payment', PaymentSchema);

const COLLECTION_NAME = "payments";

router.get('/get', (req, res) => {
    PaymentModel.filter(req, (err, result) => {
        res.json(result);
    });
});

router.post('/add', (req, res) => {
    PaymentModel.addOne(req, (err, result) => {
        res.json(result);
    });
});

router.post('/addmany', (req, res) => {
    if (req.body.data) {
        for (const item of req.body.data) {
            delete item._id;
        }
    }

    PaymentModel
        .addMany(req)
        .then(payments => res.json(payments))
        .catch(error => res.json({error}));
});

/*router.post('/import', (req, res) => {
 const db = mongo.getDbConnection();
 const documents = db.collection(COLLECTION_NAME);

 documents.insertMany(req.body, () => {
 res.send({});
 });
 });*/

router.put('/:id', (req, res) => {
    PaymentModel
        .updateOne(req)
        .then(() => res.json({}))
        .catch(error => res.json({error}));
});

router.delete('/:id', (req, res) => {
    const db = mongo.getDbConnection();
    const collection = db.collection(COLLECTION_NAME);

    collection.deleteOne({
        "_id": ObjectId(req.body._id)
    }, () => res.send({}));
});

router.get('/report', (req, res) => {
    const db = mongo.getDbConnection();
    const collection = db.collection(COLLECTION_NAME);
    const match = {
        /*"date": {
            $gt: new Date(2015).getTime(),
            $lt: new Date(2017).getTime()
        }*/
    };

    const aggregation = [
        {
            $match: match
        },
        {
            $group: {
                _id: "$category",
                total: {
                    $sum: "$value"
                }
            }
        }
    ];

    collection
        .aggregate(aggregation)
        .toArray((err, docs) => {

            res.send(docs);
        });
});

router.get('/report/groups', (req, res) => {
    const db = mongo.getDbConnection();
    const collection = db.collection(COLLECTION_NAME);

    const aggregation = [
        {
            $group: {
                _id: {
                    "category": "$category",
                    "date": {
                        $add: [
                            new Date(0),
                            "$date"
                        ]
                    },
                    "value": "$value",
                    "itemCount": {
                        "$sum": 1
                    }
                }
            }
        },
        {
            $project: {
                "month": {
                    $month: "$_id.date"
                },
                "year": {
                    $year: "$_id.date"
                }
            }
        },
        {
            $group: {
                "_id": {
                    "year": "$year",
                    "month": "$month",
                    "category": "$_id.category"
                },
                "count": {
                    $sum: "$_id.itemCount"
                },
                "sum": {
                    $sum: "$_id.value"
                }
            }
        },
        {
            $sort: {
                "_id.year": -1,
                "_id.month": -1
            }
        },
        {
            $project: {
                "month": "$_id.month",
                "year": "$_id.year",
                "category": "$_id.category",
                "count": "$count",
                "sum": "$sum",
                "_id": false
            }
        }
    ];

    collection
        .aggregate(aggregation)
        .toArray((err, docs) => res.send(docs));
});

module.exports = router;