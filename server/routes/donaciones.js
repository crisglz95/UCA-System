const express = require("express");
const Empresa = require("../models/empresa");
const donaciones = require("../models/donaciones");
const app = express();

// LISTAR DONACIONES GENERALES
app.get("/donaciones", function (req, res) {
  donaciones.find({}).exec((err, donacion) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      donacion,
    });
  });
});


//LISTAR DONACIONES DE UNA EMPRESA
app.get("/donacionesEmpresa", function (req, res) {
  cupon.find({}).exec((err, cupones) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      cupones,
    });
  });
});



// POST DONACIONES
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
