const express = require("express");
const Empresa = require("../models/empresa");
const cupon = require("../models/cupon");
const app = express();


const { verificaToken } = require('../middlewares/autenticacion');

// LISTAR CUPONES GENERALES
app.get("/listarCupones", function(req, res) {
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


//LISTAR CUPONES EMPRESA
app.get("/listarCuponesEmpresa", function(req, res) {
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
app.post("/listarCupones", verificaToken, function(req, res) {
    console.log("POST /cupon");
    console.log(req.body);
    let body = req.body;
    body.empresa = req.empresa._id;

    let CUPON = new cupon(body);

    CUPON.save((err, cuponStored) => {
        if (err) res.status(500).send({ message: `Error al salvar bd ${err}` });
        res.status(200).send({ CUPON: cuponStored });
    });
});

module.exports = app;