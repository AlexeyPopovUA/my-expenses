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
        return new Promise((resolve) => {
            // Use connect method to connect to the Server
            mongoose.connect(url, err => {
                db_connection = mongoose.connection;

                db_connection.on('error', console.error.bind(console, 'connection error:'));
                db_connection.once('open', () => {
                    console.log("we are successfully connected.")
                });

                resolve(db_connection);
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
