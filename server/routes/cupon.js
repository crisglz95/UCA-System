const express = require("express");
const Empresa = require("../models/empresa");
const cupon = require("../models/cupon");
const app = express();

const { verificaToken } = require("../middlewares/autenticacion");

// LISTAR CUPONES GENERALES
app.get("/listarCupones", function (req, res) {
  cupon.find({}).exec((err, cupones) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.render("cupon", {
      cupones,
    });
  });
});

// LISTAR CUPONES DESCUENTOS
app.get("/CuponesDescuentos", function (req, res) {
  cupon.find({ tipo_cupon: "descuentos" }).exec((err, cupones) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.render("cupon", {
      cupones,
    });
  });
});

// LISTAR CUPONES PROMOCIONES
app.get("/CuponesPromociones", function (req, res) {
  cupon.find({ tipo_cupon: "promociones" }).exec((err, cupones) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.render("cupon", {
      cupones,
    });
  });
});

// LISTAR CUPONES PARA ESTUDIANTES
app.get("/CuponesEstudiantes", function (req, res) {
  cupon.find({ valido_persona: "estudiantes" }).exec((err, cupones) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.render("cupon", {
      cupones,
    });
  });
});

// LISTAR CUPONES PARA ENVIOS GRATIS
app.get("/CuponesEnviosGratis", function (req, res) {
  cupon.find({ tipo_cupon: "envios" }).exec((err, cupones) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.render("cupon", {
      cupones,
    });
  });
});

//LISTAR CUPONES EMPRESA
app.get("/listarCuponesEmpresa", function (req, res) {
  cupon.find({ empresa: "tesla" }).exec((err, cupones) => {
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

// AGREGAR CUPONES
app.post("/listarCupones", verificaToken, function (req, res) {
  console.log("POST /cupon");
  console.log(req.body);
  let body = req.body;
  body.empresa = req.empresa._id;

  let CUPON = new cupon(body);

  CUPON.save((err, cuponStored) => {
    if (err) res.status(500).send({ message: `Error al salvar bd ${err}` });
    res.render("register-success", {
      CUPON: cuponStored,
      enlace: "/sistemaCupones",
      boton: "Cupones",
    });
  });
});

module.exports = app;
