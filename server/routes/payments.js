"use strict";

const express = require('express');
const router = express.Router();
const mongo = require("./../mongo");
const ObjectId = require('mongodb').ObjectId;

const COLLECTION_NAME = "payments";

router.get('/get', (req, res) => {
    const db = mongo.getDbConnection();
    const collection = db.collection(COLLECTION_NAME);
    const query = req.query;
    const match = {};
    const sort = {};

    if (query.filterBy !== undefined) {
        match[query.filterBy] = query.value;
    } else if (query._id !== undefined) {
        match._id = ObjectId(query._id);
    }

    const aggregation = [{
        $match: match
    }];

    if (query.sort && query.sort.length > 0) {
        const parsedSort = JSON.parse(query.sort);

        for (const sorter of parsedSort) {
            sort[sorter.property] = sorter.direction === "ASC" ? 1 : -1;
        }

        aggregation.push({
            $sort: sort
        });
    }

    collection
        .aggregate(aggregation)
        .toArray((err, docs) => {
            _convertAllToDateByField(docs, "date");

            res.send(docs);
        });
});

router.post('/add', (req, res) => {
    const db = mongo.getDbConnection();
    const collection = db.collection(COLLECTION_NAME);

    collection.insertOne(req.body, () => res.send({}));
});

router.post('/addmany', (req, res) => {
    const db = mongo.getDbConnection();
    const collection = db.collection(COLLECTION_NAME);

    if (req.body.data) {
        for (const item of req.body.data) {
            delete item._id;
        }
    }

    collection.insertMany(req.body.data, () => res.send({}));
});

/*router.post('/import', (req, res) => {
 const db = mongo.getDbConnection();
 const documents = db.collection(COLLECTION_NAME);

 documents.insertMany(req.body, () => {
 res.send({});
 });
 });*/

router.put('/:id', (req, res) => {
    const db = mongo.getDbConnection();
    const collection = db.collection(COLLECTION_NAME);

    const filter = {
        _id: ObjectId(req.body._id)
    };

    const update = {};

    for (const key in req.body) {
        if (req.body.hasOwnProperty(key) && key !== "_id") {
            update[key] = req.body[key];
        }
    }

    collection.updateOne(
        filter,
        {
            $set: update
        },
        () => res.send({})
    );
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

function _convertAllToDateByField(list, fieldName) {
    for (const item of list) {
        item[fieldName] = new Date(item[fieldName]);
    }
}

module.exports = router;