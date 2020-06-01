const express = require("express");
const Empresa = require("../models/empresa");
const donaciones = require("../models/donaciones");
const app = express();

const { verificaToken } = require("../middlewares/autenticacion");

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
        res.render("agregar-foto-donacion", { //register-success
            DONAR: donarDB,
            enlace: "/sistemaDonaciones",
            boton: "Donaciones",
        });
    });
});

app.get('/eliminarDonacion:id', function(req, res) {
    let id = req.params.id;
    id = id.substr(1, id.length - 1);
    let body = req.body;

    donaciones.findById(id, (err, donacionesDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!donacionesDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Id no encontrado`
                }
            });
        }

        console.log(donacionesDB);

        res.render('donaciones-eliminar', {
            ok: true,
            donacion: donacionesDB
        })
    })
});

app.post('/eliminarDonacion:id', function(req, res) {
    let id = req.params.id;
    id = id.substr(1, id.length - 1);
    let body = req.body;
    let status = true;

    body.eliminado = status;

    donaciones.findByIdAndUpdate(id, body, { new: true }, (err, donacionesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.render('home-sys', {});
    });
})

app.get('/info-donaciones:id', function(req, res) {
    let id = req.params.id;
    id = id.substr(1, id.length - 1);
    let body = req.body;

    donaciones.findById(id, (err, donacionesDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!donacionesDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id no encontrado'
                }
            });
        }

        console.log(donacionesDB);

        res.render('donaciones-ver-sys', {
            ok: true,
            donacion: donacionesDB
        })
    })
})

module.exports = app;