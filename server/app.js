"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const userRoutes = require("./routes/user");
const commentsRoutes = require("./routes/comments");
const authRoutes = require("./routes/auth");
const omdbRoutes = require("./routes/omdb");
const favoritesRoutes = require("./routes/favorites");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/users", userRoutes);
app.use("/comments", commentsRoutes);
app.use("/auth", authRoutes);
app.use("/omdb", omdbRoutes);
app.use("/favorites", favoritesRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
