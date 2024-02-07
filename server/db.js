"use strict";
/** Database setup for cinerator. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    database: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    database: getDatabaseUri()
  });
}

// db = new Client({
//   // host: 'localhost',
//   // port: 5432,
//   database: 'cinerator',
// });

db.connect();

module.exports = db;