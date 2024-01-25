"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Comments = require("../models/comments");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const comment = await Comments.post(req.body);
    const token = createToken(comment);
    return res.status(201).json({ comment, token });
  } catch (err) {
    return next(err);
  }
}
);

router.get("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const comment = await Comments.get(req.params.id);
    return res.json({ comment });
  } catch (err) {
    return next(err);
  }
}
);

router.patch("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const comment = await Comments.update(req.params.id, req.body);
    return res.json({ comment });
  } catch (err) {
    return next(err);
  }
}
);

router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await Comments.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
}
);

module.exports = router;