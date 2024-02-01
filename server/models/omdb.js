"use strict";

/** Routes for users. */

const express = require("express");
const jsonschema = require("jsonschema");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_API_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&`;
const OMDB_IMG_URL = `http://img.omdbapi.com/?apikey=${OMDB_API_KEY}&`;

class Omdb {
    static async get(id) {
        const omdbRes = await axios.get(`${OMDB_API_URL}i=${id}`);
        if (omdbRes.data.Response === "False") {
            throw new NotFoundError(`No movie: ${id}`);
        }
        return omdbRes.data;
    }

    static async getByTitle(title) {
        const omdbRes = await axios.get(`${OMDB_API_URL}t=${title}`);
        if (omdbRes.data.Response === "False") {
            throw new NotFoundError(`No movie: ${title}`);
        }
        return omdbRes.data;
    }

    static async getImg(id) {
        const omdbImgRes = await axios.get(`${OMDB_IMG_URL}i=${id}`);
        if (omdbImgRes.data.Response === "False") {
            throw new NotFoundError(`No movie: ${id}`);
        }
        return omdbImgRes.data;
    }
}

module.exports = Omdb;