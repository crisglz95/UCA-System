const express = require('express');
const Empresa = require('../models/empresa');
const { verificaToken } = require('../middlewares/autenticacion');

const bcrypt = require("bcrypt");

const app = express();

app.get('/empresa', verificaToken, function(req, res) {
    console.log(req.empresa);
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Empresa.find({})
        //skip(5)
        .limit(25)
        .exec((err, empresa) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            Empresa.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    empresa,
                    numeroEmpresa: conteo,
                });
            });
        });
});

app.get('/empresaActiva', verificaToken, function(req, res) {
    Empresa.find({ status: true })
        .exec((err, empresasDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.send({
                empresasActivas: empresasDB
            });
        });
});

app.get('/empresaInactiva', verificaToken, function(req, res) {
    Empresa.find({ status: false })
        .exec((err, empresasDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.send({
                empresasInactivas: empresasDB
            });
        });
});

app.post("/empresa", function(req, res) {
    let body = req.body;

    body.password = bcrypt.hashSync(req.body.password, 10);
    console.log(body);

    let empresa = new Empresa(body);

    if (body.nombre_completo === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es necesario",
        });
    }
    // else {
    //     res.json({
    //         persona: body
    //     });
    // }

    empresa.save((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            empresaDB,
        });
    });
});

app.put("/empresa/:id", function(req, res) {
    let id = req.params.id;
    let body = req.body;

    Empresa.findById(id, body, { new: true }, (err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            empresa: empresaDB,
        });
    });
});

module.exports = app;