const express = require("express");
const Empresa = require("../models/empresa");
const { verificaToken } = require("../middlewares/autenticacion");

const bcrypt = require("bcrypt");

const app = express();

app.get("/empresa", function(req, res) {
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

app.get("/activarEmpresa:id", verificaToken, function(req, res) {
    // let empresa = req.body;
    // console.log(empresa);
    let id = req.params.id;
    id = id.substr(1, id.length - 1);


    // res.render('acept-empresa', {
    //     ok: true,
    //     //empresa: empresaDB
    // });

    Empresa.findById(id, (err, empresaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!empresaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Id no encontrado`
                }
            });
        }

        console.log(empresaDB);

        res.render('acept-empresa', {
            ok: true,
            empresa: empresaDB
        });
    });
});

app.get("/empresaActiva", verificaToken, function(req, res) {
    Empresa.find({ status: true }).exec((err, empresasDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.send({
            empresasActivas: empresasDB,
        });
    });
});

app.get("/empresaInactiva", verificaToken, function(req, res) {
    Empresa.find({ status: false }).exec((err, empresasDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.send({
            empresasInactivas: empresasDB,
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

app.post("/empresa:id", verificaToken, function(req, res) {
    let id = req.params.id;
    id = id.substr(1, id.length - 1);
    let body = req.body;

    body.status = !body.status;

    Empresa.findByIdAndUpdate(id, body, { new: true }, (err, empresaDB) => {
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

// HOTELERIA
app.get("/Hoteleria", function(req, res) {
    Empresa.find({ giro_empresarial: "Hoteleria" }).exec((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.render("home_empresas", {
            empresa: empresaDB,
        });
    });
});

//   Restaurantes/Servicios de comida
app.get("/Restaurantes", function(req, res) {
    Empresa.find({ giro_empresarial: "Restaurantes/Servicios de comida" }).exec(
        (err, empresaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.render("home_empresas", {
                empresa: empresaDB,
            });
        }
    );
});

// Consultoria Empresarial
app.get("/ConsultoriaEmpresarial", function(req, res) {
    Empresa.find({ giro_empresarial: "Consultoria Empresarial" }).exec(
        (err, empresaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.render("home_empresas", {
                empresa: empresaDB,
            });
        }
    );
});

// Medicina
app.get("/Medicina", function(req, res) {
    Empresa.find({ giro_empresarial: "Medicina" }).exec((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.render("home_empresas", {
            empresa: empresaDB,
        });
    });
});

// Industria
app.get("/Industria", function(req, res) {
    Empresa.find({ giro_empresarial: "Industria" }).exec((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.render("home_empresas", {
            empresa: empresaDB,
        });
    });
});

// Construcción
app.get("/Construccion", function(req, res) {
    Empresa.find({ giro_empresarial: "Construccion" }).exec((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.render("home_empresas", {
            empresa: empresaDB,
        });
    });
});

// Servicios
app.get("/Servicios", function(req, res) {
    Empresa.find({ giro_empresarial: "Servicios" }).exec((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.render("home_empresas", {
            empresa: empresaDB,
        });
    });
});

// Comercio
app.get("/Comercio", function(req, res) {
    Empresa.find({ giro_empresarial: "Comercio" }).exec((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.render("home_empresas", {
            empresa: empresaDB,
        });
    });
});

// Automoviles
app.get("/Automoviles", function(req, res) {
    Empresa.find({ giro_empresarial: "Automoviles" }).exec((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.render("home_empresas", {
            empresa: empresaDB,
        });
    });
});

// Veterinaria
app.get("/Veterinaria", function(req, res) {
    Empresa.find({ giro_empresarial: "Veterinaria" }).exec((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.render("home_empresas", {
            empresa: empresaDB,
        });
    });
});

// Tecnologia
app.get("/Tecnologia", function(req, res) {
    Empresa.find({ giro_empresarial: "Tecnologia" }).exec((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.render("home_empresas", {
            empresa: empresaDB,
        });
    });
});

// Otros
app.get("/Otros", function(req, res) {
    Empresa.find({ giro_empresarial: "Otros" }).exec((err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.render("home_empresas", {
            empresa: empresaDB,
        });
    });
});

module.exports = app;