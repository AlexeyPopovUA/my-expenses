"use strict";

const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

let db_connection = null;

// Connection URL
const url = 'mongodb://localhost:27017/my-expenses';

module.exports = {
    start: () => {
        return new Promise((resolve) => {
            // Use connect method to connect to the Server
            MongoClient.connect(url, (err, db) => {
                db_connection = db;
                assert.equal(null, err);
                console.log("Connected correctly to server");

                resolve(db_connection);
            });
        });
    },

    stop: () => {
        db_connection.close();
        db_connection = null;
    },

    getDbConnection: () => db_connection
};