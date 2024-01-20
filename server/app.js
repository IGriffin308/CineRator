"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
// const route1Routes = require("./routes/route1");
// const route2Routes = require("./routes/route2");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// app.use("/route1", route1Routes);
// app.use("/route2", route2Routes);
// etc
 //placeholder route for testing
app.get('/api', (req, res) => {
    res.json([
        {
            "data": {
                "id": 1,
                "title": 'Hello from server'
            }
        }
    ]);
}
);


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
