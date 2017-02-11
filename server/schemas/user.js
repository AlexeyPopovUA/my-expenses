"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = Schema({
    "first_name": String,
    "last_name": String,
    "url": String,
    "email": String,
    "username": {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    "password": {
        type: String,
        required: true
    }
});

//Add one new user to the database
UserSchema.statics.addOne = function(req, done) {
    const User = this,
        body = req.body;
    let data = { //sets all the defaults
            "first_name": "",
            "last_name": "",
            "email": "",
            "username": "username",
            "url": "",
            "password": "password"
        };

    data = Object.assign(data, body);

    User.create(data, (err, user) => {
        if (err) {
            return done(err, {
                "error": err
            });
        }
        return done(null, user);
    });

};

//Retrieve all users
UserSchema.statics.getAll = function(done) {
    this.find({}, (err, users) => {
        const arr = [];

        if (err) {
            return done(err, {
                "error": err
            });
        }

        users.forEach(user => arr.push(user));

        return done(null, arr);
    });
};

//Retrieve a particular user, based on the userid
//which we get from the GET url
UserSchema.statics.getOne = function(userid, done) {
    this.findOne({
        "_id": userid
    }, (err, user) => {
        if (err) return done(err, {
            "error": err
        });

        if (!user) {
            return done(null, {
                "error": "None."
            });
        }

        return done(null, user);
    });
};

module.exports = UserSchema;
