"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require("lodash"),
    ObjectId = mongoose.Types.ObjectId;

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

PaymentSchema.PAYMENT_CATEGORIES = {
    FOOD: "Food",
    HOUSEHOLD: "Household",
    CLOSES: "Closes",
    HEALTH: "Health",
    TOILET: "Toilet",
    TRAVELLING: "Travelling",
    SPECIAL: "Special",
    MOBILEANDINTERNET: "Mobile and internet",
    ENTERTAINMENT: "Entertainment",
    ALIEXPRESS: "Ali Express",
    AMAZON: "Amazon",
    EBAY: "Ebay",
    INSURANCE: "Insurance",
    RENT: "Rent",
    OTHER: "Other"
};

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
    //use bulkWrite instead
    const promises = _.map(request.body.data, item => addOne.call(this, item));

    return Promise.all(promises);
};

PaymentSchema.statics.updateOnePayment = function(request) {
    const filter = {
        _id: ObjectId(request.body._id)
    };

    return this.update(filter, _.omit(request.body, "_id"));
};

PaymentSchema.statics.deleteOnePayment = function(request) {
    const filter = {
        _id: ObjectId(request.body._id)
    };

    return this.remove(filter);
};

PaymentSchema.statics.getGroupedReport = function() {
    return this
        .aggregate()
        .group({
            _id: {
                "category": "$category",
                "date": "$date",
                "value": "$value",
                "itemCount": {
                    "$sum": 1
                }
            }
        })
        .project({
            "month": {
                $month: "$_id.date"
            },
            "year": {
                $year: "$_id.date"
            }
        })
        .group({
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
        })
        .sort({
            "_id.year": -1,
            "_id.month": -1
        })
        .project({
            "month": "$_id.month",
            "year": "$_id.year",
            "category": "$_id.category",
            "count": "$count",
            "sum": "$sum",
            "_id": false
        })
        .exec()

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
