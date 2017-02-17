"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

PaymentSchema.statics.findAll = function(request, done) {
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
        .then(result => {
            done(null, result);
        });
};

PaymentSchema.statics.addOne = function(request, done) {
    const Payment = this,
        body = request.body;
    //sets all the defaults
    let data = {
        "name": "",
        "category": "",
        "date": null,
        "value": 0
    };

    data = Object.assign(data, body);

    data["date"] = new Date(body.date);

    Payment.create(data, (err, payment) => {
        if (err) {
            return done(err, {
                "error": err
            });
        }
        return done(null, payment);
    });
};

module.exports = PaymentSchema;
