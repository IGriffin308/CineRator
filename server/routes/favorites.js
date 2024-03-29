"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Favorites = require("../models/favorites");
const { createToken } = require("../helpers/tokens");
const favoriteNewSchema = require("../schemas/favoriteNew.json");
const favoriteUpdateSchema = require("../schemas/favoriteUpdate.json");

const router = express.Router();

router.post("/", 
// ensureCorrectUserOrAdmin,
 async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, favoriteNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const favorite = await Favorites.post(req.body);
    // const token = createToken(favorite);
    console.log("favorite", favorite);
    return res.status(201).json({ favorite
      // , token 
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/user-movie/:userid/:movieid", async function (req, res, next) {
  try {
    console.log("req.params.userid", req.params.userid, "req.params.movieid", req.params.movieid);
    const favorite = await Favorites.get(req.params.userid, req.params.movieid);
    return res.json({ favorite });
  } catch (err) {
    return next(err);
  }
});

router.get("/user/:userid", async function (req, res, next) {
  try {
    const favorites = await Favorites.getAllForUser(req.params.userid);
    return res.json({ favorites });
  } catch (err) {
    return next(err);
  }
});

router.get("/movie/:movieid", async function (req, res, next) {
  try {
    console.log("req.params.movieid", req.params.movieid);
    const favorites = await Favorites.getAllForMovie(req.params.movieid);
    return res.json({ favorites });
  } catch (err) {
    return next(err);
  }
});

router.patch("/user-movie/:userid/:movieid",
//  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, favoriteUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    console.log("req.params.userid", req.params.userid, "req.params.movieid", req.params.movieid, "req.body", req.body);
    const favorite = await Favorites.update(req.params.userid, req.params.movieid, req.body.rating, req.body.favorite);
    return res.json({ favorite });
  } catch (err) {
    return next(err);
  }
});

router.delete("/user-movie/:userid/:movieid", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await Favorites.remove(req.params.userid, req.params.movieid);
    return res.json({ deleted: `${req.params.userid} ${req.params.movieid}` });
  } catch (err) {
    return next(err);
  }
});

router.get("/check/:userId/:movieId", async function (req, res, next) {
  try {
    const favoriteId = await Favorites.checkIfFavoriteExists(req.params.userId, req.params.movieId);
    if (favoriteId.length === 0) {
      return res.json({ "exists": false });
    } else {
      return res.json({ "exists": true, "comments": favoriteId});
    }
  } catch (err) {
    return next(err);
  }
});


module.exports = router;