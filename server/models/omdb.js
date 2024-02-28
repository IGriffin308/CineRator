"use strict";

/** Routes for omdb api. */

const express = require("express");
const jsonschema = require("jsonschema");
const axios = require("axios");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

// Switch between reading from .env file or api-key.js file
const OMDB_API_KEY = require("../api-key");
// const OMDB_API_KEY = process.env.API_KEY;

if (!OMDB_API_KEY) {
    console.log("OMDB_API_KEY not found. Go to www.omdbapi.com to get an API key. Then create a file called api-key.js in the server directory and add the line: module.exports, or add the key to the server/.env file.");
}

const OMDB_API_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&`;

class Omdb {
    static async getById(id) {
        const omdbRes = await axios.get(`${OMDB_API_URL}i=${id}`);
        console.log("requesting omdb");
        if (omdbRes.data.Response === "False") {
            throw new NotFoundError(`No movie: ${id}`);
        }
        return omdbRes.data;
    }

    static async getByTitle(title) {
        const omdbRes = await axios.get(`${OMDB_API_URL}t=${title}`);
        console.log("requesting omdb");
        if (omdbRes.data.Response === "False") {
            throw new NotFoundError(`No movie: ${title}`);
        }
        return omdbRes.data;
    }

    static async getBySearch(title) {
        const omdbRes = await axios.get(`${OMDB_API_URL}s=${title}`);
        console.log("requesting omdb");
        if (omdbRes.data.Response === "False") {
            throw new NotFoundError(`No movie: ${title}`);
        }
        return omdbRes.data;
    }

    static async returnLoremIpsum() {
        const omdbRes = {"Lorem ipsum": "dolor sit amet"};
        return omdbRes;
    }
}

module.exports = Omdb;