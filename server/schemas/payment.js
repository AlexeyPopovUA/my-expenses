"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require("lodash"),
    ObjectId = require('mongodb').ObjectId;

const PaymentSchema = Schema({
    "name": {
        type: String,
        required: true
    },
    "category": {
        type: String,
        required: true
    },
    "date": {
        type: Date,
        required: true
    },
    "value": Number,
});

const emptyPaymentConfig = {
    "name": "",
    "category": "",
    "date": null,
    "value": 0
};

PaymentSchema.statics.filter = function(request, done) {
    const queryParameters = request.query;
    const match = {};
    const DEFAULT_LIMIT = 50;

    if (typeof queryParameters.filterBy !== "undefined") {

        match[queryParameters.filterBy] = queryParameters.value;
    } else if (typeof queryParameters._id !== "undefined") {
        match._id = ObjectId(queryParameters._id);
    }

    let dbQuery = this.find(match);

    if (queryParameters.sort && queryParameters.sort.length > 0) {
        try {
            const parsedSort = JSON.parse(queryParameters.sort);
            const sortersList = [];

            for (const sorter of parsedSort) {
                sortersList.push(sorter.direction === "ASC" ? sorter.property : `-${sorter.property}`);
            }

            dbQuery = dbQuery
                .sort(sortersList.join(" "));
        } catch (error) {
            //igore error
            console.error(error);
        }
    }

    dbQuery
        .limit(queryParameters.limit ? parseInt(queryParameters.limit) : DEFAULT_LIMIT)
        .exec()
        .then(result => done(null, result));
};

PaymentSchema.statics.addOne = function(request, done) {
    addOne.call(this, request.body)
        .then(payment => done(null, payment))
        .catch(error => done(error, {error}));
};

PaymentSchema.statics.addMany = function(request) {
    const promises = _.map(request.body.data, item => addOne.call(this, item));

    return Promise.all(promises);
};

PaymentSchema.statics.updateOne = function(request) {
    const filter = {
        _id: ObjectId(request.body._id)
    };

    return this.update(filter, _.omit(request.body, "_id"));
};

function addOne(body) {
    const Payment = this;

    return new Promise((resolve, reject) => {
        //sets all the defaults
        const data = Object.assign(_.clone(emptyPaymentConfig), body);

        data["date"] = new Date(body.date);

        Payment.create(data, (error, payment) => error ? reject(error) : resolve(payment));
    });
}

module.exports = PaymentSchema;
