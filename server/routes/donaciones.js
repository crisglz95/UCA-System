const express = require("express");
const Empresa = require("../models/empresa");
const donaciones = require("../models/donaciones");
const app = express();

const { verificaToken } = require('../middlewares/autenticacion');

// LISTAR DONACIONES GENERALES
app.get("/donaciones", function(req, res) {
    donaciones.find({}).exec((err, donacion) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.render("donaciones", {
            ok: true,
            donacion,
        });
    });
});


//LISTAR DONACIONES DE UNA EMPRESA
app.get("/donacionesEmpresa", function(req, res) {
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
app.post("/donaciones", verificaToken, function(req, res) {
    console.log("POST /donaciones");
    console.log(req.body);
    let body = req.body;
    body.empresa = req.empresa._id;

    let DONAR = new donaciones(body);

    DONAR.save((err, donarDB) => {
        if (err) res.status(500).send({ message: `Error: ${err}` });
        res.render('register-success', { DONAR: donarDB, enlace: '/sistemaDonaciones', boton: 'Donaciones' });
    });
});

module.exports = app;