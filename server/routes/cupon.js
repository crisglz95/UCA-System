const express = require("express");
const Empresa = require("../models/empresa");
const cupon = require("../models/cupon");

const app = express();

app.get("/cupon", function (res, req) {
  console.log("Ingresa Cupon");
});

// POST
app.post("/cupon", function (req, res) {
  console.log("POST /cupon");
  console.log(req.body);
  let body = req.body;

  let CUPON = new cupon(body);

  CUPON.save((err, cuponStored) => {
    if (err) res.status(500).send({ message: `Error al salvar bd ${err}` });
    res.status(200).send({ CUPON: cuponStored });
  });
});

module.exports = app;
