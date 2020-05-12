const express = require("express");
const Empresa = require("../models/empresa");
const donaciones = require("../models/donaciones");
const app = express();

app.get("/donaciones", function (res, req) {
  console.log("work donar");
});

// POST
app.post("/donaciones", function (req, res) {
  console.log("POST /donaciones");
  console.log(req.body);
  let body = req.body;

  let DONAR = new donaciones(body);

  DONAR.save((err, donarDB) => {
    if (err) res.status(500).send({ message: `Error: ${err}` });
    res.status(200).send({ DONAR: donarDB });
  });
});

module.exports = app;
