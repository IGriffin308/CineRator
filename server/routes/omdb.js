"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const Omdb = require("../models/omdb");
const { createToken } = require("../helpers/tokens");
const omdbGetSchema = require("../schemas/omdbGet.json");
// const omdbGetImgSchema = require("../schemas/omdbGetImg.json");

const router = express.Router();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_API_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&`;
// const OMDB_IMG_URL = `http://img.omdbapi.com/?apikey=${OMDB_API_KEY}&`;


// get by ID

router.get("/id/:id", async function (req, res, next) {
    try {
        console.log("requesting omdb")
        const omdbRes = await Omdb.getById(req.params.id);
        return res.json({ omdbRes });
    } catch (err) {
        return next(err);
    }
});


// get by title search

router.get("/title/:title", async function (req, res, next) {
    try {
        const omdbRes = await Omdb.getByTitle(req.params.title);
        return res.json({ omdbRes });
    } catch (err) {
        return next(err);
    }
});

router.get("/search/:title", async function (req, res, next) {
    try {
        const omdbRes = await Omdb.getBySearch(req.params.title);
        return res.json({ omdbRes });
    } catch (err) {
        return next(err);
    }
});

router.get("/lorem", async function (req, res, next) {
    try {
        const omdbRes = await Omdb.returnLoremIpsum();
        console.log(omdbRes)
        return res.json({ omdbRes });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;