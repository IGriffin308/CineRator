"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const Omdb = require("../models/omdb");
const { createToken } = require("../helpers/tokens");
const omdbGetSchema = require("../schemas/omdbGet.json");
const omdbGetImgSchema = require("../schemas/omdbGetImg.json");

const router = express.Router();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_API_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&`;
// const OMDB_IMG_URL = `http://img.omdbapi.com/?apikey=${OMDB_API_KEY}&`;


// get by ID

router.getById("/omdb/:id", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, omdbGetSchema);
        if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
        }
    
        const omdbRes = await Omdb.get(req.params.id);
        return res.json({ omdbRes });
    } catch (err) {
        return next(err);
    }
});


// get by title search

router.getByTitle("/omdb/:title", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, omdbGetSchema);
        if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
        }
        
        const omdbRes = await Omdb.get(req.params.title);
        return res.json({ omdbRes });
    } catch (err) {
        return next(err);
    }
});



// get by year search


// get image by id 

// router.get("/img/:id", async function (req, res, next) {
//     try {
//         const validator = jsonschema.validate(req.body, omdbGetImgSchema);
//         if (!validator.valid) {
//         const errs = validator.errors.map(e => e.stack);
//         throw new BadRequestError(errs);
//         }
        
//         const omdbImgRes = await Omdb.getImg(req.params.id);
//         return res.json({ omdbImgRes });
//     } catch (err) {
//         return next(err);
//     }
// });