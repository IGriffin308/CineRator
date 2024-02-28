"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Comments = require("../models/comments");
const { createToken } = require("../helpers/tokens");
const commentNewSchema = require("../schemas/commentNew.json");
const commentUpdateSchema = require("../schemas/commentUpdate.json");

const router = express.Router();

router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, commentNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const comment = await Comments.post(req.body);
    // const token = createToken(comment);
    console.log("comment", comment);
    return res.status(201).json({ comment
      // , token 
    });
  } catch (err) {
    return next(err);
  }
}
);

router.get("/:id", async function (req, res, next) {
  try {
    const comment = await Comments.get(req.params.id);
    return res.json({ comment });
  } catch (err) {
    return next(err);
  }
}
);

/** This route is not currently utilized.
 * It will be ustilized in the future for userpages as well as admin purposes.
 */
router.get("/:username", ensureAdmin, async function (req, res, next) {
  try {
    const comments = await Comments.getAllForUser(req.params.username);
    return res.json({ comments });
  } catch (err) {
    return next(err);
  }
});

router.get("/movie/:movieId", async function (req, res, next) {
  try {
    const comments = await Comments.getAllForMovie(req.params.movieId);
    return res.json({ comments });
  } catch (err) {
    return next(err);
  }
});


/** This route is not currently utilized.
 * It will be ustilized in the future to allow users to edit their comments.
 */
router.patch("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, commentUpdateSchema);
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

router.get("/check/:userId/:movieId", async function (req, res, next) {
  try {
    const commentId = await Comments.checkIfCommentExists(req.params.userId, req.params.movieId);
    if (commentId.length === 0) {
      return res.json({ "exists": false });
    } else {
      return res.json({ "exists": true, "comments": commentId});
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;