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
    MOBILEANDINTERNET: "Mobile + internet",
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

PaymentSchema.statics.filter = function(request) {
    const queryParameters = request.query;
    const match = {};
    const DEFAULT_LIMIT = 50;

    if (!_.isUndefined(queryParameters.filter)) {
        match["$and"] = [];
        const and = match["$and"];
        const filters = JSON.parse(queryParameters.filter);

        for (const filter of filters) {
            if (filter.operator === "in") {
                and.push({
                    [filter.property]: {
                        $in: [...filter.value]
                    }
                });
            }
        }
    } else if (typeof queryParameters._id !== "undefined") {
        match._id = ObjectId(queryParameters._id);
    }

    let dbQuery = this.find(match);

    if (queryParameters.sort) {
        try {
            const parsedSort = JSON.parse(decodeURIComponent(queryParameters.sort));
            const sortersList = [];

            for (const sorter of parsedSort) {
                sortersList.push(sorter.direction === 1 ? sorter.field : `-${sorter.field}`);
            }

            dbQuery = dbQuery
                .sort(sortersList.join(" "));
        } catch (error) {
            //igore error
            console.error(error);
        }
    }

    const countQuery = this.count(match);

    const page = parseInt(queryParameters.page);
    const limit = parseInt(queryParameters.limit);

    const mainQuery = dbQuery
        .limit(limit ? limit : DEFAULT_LIMIT)
        .skip(page > 1 ? (page - 1) * limit : 0);

    return Promise.all([countQuery.exec(), mainQuery.exec()])
        .then(values => {
            return Promise.resolve({
                success: true,
                items: values[1],
                results: values[0]
            });
        });
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
    const currentTimezoneOffset = -(new Date()).getTimezoneOffset() * 60 * 1000;
    return this
        .aggregate()
        .group({
            _id: {
                "category": "$category",
                "date": {
                    $add: [
                        "$date",
                        currentTimezoneOffset
                    ]
                },
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
