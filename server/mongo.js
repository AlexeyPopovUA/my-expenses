"use strict";

const config = require("./config/local_settings");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db_connection = null;

// Connection URL
const url = config.database;

module.exports = {
    start: () => {
        return mongoose
            .connect(url)
            .then(() => db_connection = mongoose.connection)
            .catch(error => console.error(error));
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
