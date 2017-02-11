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

PaymentSchema.statics.getAll = function(done) {
    this.find({}, (err, items) => {
        const arr = [];

        if (err) {
            return done(err, {
                "error": err
            });
        }

        items.forEach(item => arr.push(item));

        return done(null, arr);
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
