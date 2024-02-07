"use strict";

const app = require("./app");
const { PORT } = require("./config");

// const os = require("os");
// const hostName = os.hostname();
// const hostName = "localhost";
// console.log(`hostName: ${hostName}`);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Started on http://localhost:${PORT}`);
});