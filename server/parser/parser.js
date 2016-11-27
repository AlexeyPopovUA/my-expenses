"use strict";

const xlsx = require("xlsx");
const moment = require("moment");

const file = xlsx.readFile("./data/import/Payments.xlsx");
const cells = file.Sheets[file.SheetNames[0]];

const nameCell = "B";
const categoryCell = "C";
const dateCell = "D";
const valueCell = "E";
const result = [];

let i = 3;

while (cells[`${nameCell}${i}`]) {
    const name = `${nameCell}${i}`;
    const category = `${categoryCell}${i}`;
    const date = `${dateCell}${i}`;
    const value = `${valueCell}${i}`;

    const row = {
        name: cells[name].h,
        category: cells[category].h,
        date: moment(cells[date].w, "DD/MM/YY").valueOf(),
        value: cells[value].v
    };

    result.push(row);

    i++;
}

console.log(result);

/*
const mongo = require("./../mongo");

mongo.start()
    .then((db) => {
        return new Promise((resolve) => {
            const COLLECTION_NAME = "payments";
            const documents = db.collection(COLLECTION_NAME);

            documents.insertMany(result, () => {
                resolve();
            });
        });
    })
    .then(() => mongo.stop());*/
