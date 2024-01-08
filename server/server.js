"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});


// const express = require('express');
// const app = express();
// const port = 5000;

// app.get('/api', (req, res) => {
//     res.json([
//         {
//             "data": {
//                 "id": 1,
//                 "title": 'Hello from server'
//             }
//         }
//     ]);
// }
// );

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));