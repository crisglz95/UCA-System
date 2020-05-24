const express = require("express");
const app = express();

const cupon = require("../models/cupon");
const donacion = require("../models/donaciones");
const Empresa = require("../models/empresa");

const { verificaToken } = require('../middlewares/autenticacion');

app.get("/company", (req, res) => {
    res.render("company", {});
});

app.get("/login", (req, res) => {
    res.render("login", {});
});

app.get('/registro', (req, res) => {
    res.render('register', {})
});

app.get('/administrador-home', verificaToken, (req, res) => {
    res.render('admin-sys', {})
});

app.get('/lista-empresa', verificaToken, (req, res) => {
    Empresa.find({ status: false, administrador: false }).exec((err, EmpresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        console.log(EmpresaDB);
        res.render('lista-empresas', { empresa: EmpresaDB });
    });
});

app.get('/lista-empresa-activas', verificaToken, (req, res) => {
    Empresa.find({ status: true, administrador: false | undefined }).exec((err, EmpresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        console.log(EmpresaDB);
        res.render('lista-empresas', { empresa: EmpresaDB });
    });
});

app.get("/consultoria_y_capacitacion", (req, res) => {
    res.render("consultoria_y_capacitacion", {});
});


app.get("/cupon", (req, res) => {
    cupon.find({}).exec((err, cupones) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        console.log(cupones);

        res.render('cupon', {
            ok: true,
            cupones,
        });
    });
    //res.render("cupon", {});
});

app.get("/sistemaCupones", verificaToken, (req, res) => {
    let idEmpresa = req.empresa._id;
    cupon.find({ empresa: idEmpresa }).exec((err, cuponesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.render('cupones-sys', {
            empresa: req.empresa,
            cupones: cuponesDB
        })
    });
    // console.log(req.empresa);
    // res.render("cupones-sys", {
    //     empresa: req.empresa
    // });
});

app.get("/sistemaDonaciones", verificaToken, (req, res) => {
    let idEmpresa = req.empresa._id;
    donacion.find({ empresa: idEmpresa }).exec((err, donacionesDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.render('donaciones-sys', {
            empresa: req.empresa,
            donaciones: donacionesDB
        });
    });
    // res.render("donaciones-sys", {
    //     empresa: req.empresa
    // });
});

//Redireccionamiento de menu lateral
app.get("/sistemaHome", verificaToken, (req, res) => {
    res.render('home-sys', {
        empresa: req.empresa
    })
})

app.get("/formCupones", verificaToken, (req, res) => {
    res.render("form-cupones", {
        empresa: req.empresa
    });
});

app.get("/formDonaciones", verificaToken, (req, res) => {
    res.render("form-donaciones", {
        empresa: req.empresa
    });
});

module.exports = app;