const express = require("express");
const app = express();

const { verificaToken } = require('../middlewares/autenticacion');

app.get("/company", (req, res) => {
    res.render("company", {});
});

app.get("/login", (req, res) => {
    res.render("login", {});
});

app.get("/cupon", (req, res) => {
    res.render("cupon", {});
});

//Redireccionamiento de menu lateral
app.get("/sistemaHome", verificaToken, (req, res) => {
    res.render('home-sys', {
        empresa: req.empresa
    })
})

app.get("/sistemaCupones", verificaToken, (req, res) => {
    console.log(req.empresa);
    res.render("cupones-sys", {
        empresa: req.empresa
    });
});

app.get("/sistemaDonaciones", verificaToken, (req, res) => {
    res.render("donaciones-sys", {
        empresa: req.empresa
    });
});

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