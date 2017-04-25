"use strict";

const assert = require('assert');
const config = require("./config/local_settings");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db_connection = null;

// Connection URL
const url = config.database;

module.exports = {
    start: () => {
        return new Promise((resolve, reject) => {
            // Use connect method to connect to the Server
            mongoose.connect(url, err => {
                db_connection = mongoose.connection;

                db_connection.on('error', error => reject(error));
                db_connection.once('open', () => resolve(db_connection));

                if (err) {
                    reject(err);
                }
            });
        });
    },

    stop: () => {
        if (db_connection) {
            db_connection.close(() => {
                db_connection = null;

                console.log("Connection was closed");
            });

        }
    },

    getDbConnection: () => db_connection
};
