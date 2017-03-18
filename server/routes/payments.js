"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const PaymentSchema = require("./../schemas/payment");
const PaymentModel = mongoose.model('Payment', PaymentSchema);

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
        .updateOnePayment(req)
        .then(() => res.json({}))
        .catch(error => res.json({error}));
});

router.delete('/:id', (req, res) => {
    PaymentModel
        .deleteOnePayment(req)
        .then(() => res.send({}))
        .catch(error => res.json({error}));
});

router.get('/report/groups', (req, res) => {
    PaymentModel
        .getGroupedReport()
        .then(docs => res.send(docs))
        .catch(error => res.send({error}));
});

module.exports = router;
