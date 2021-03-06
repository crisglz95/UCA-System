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

// ACTIVAR EMPRESA PARA PASAR EL ID Y ACTUALIZAR DATOS
app.get("/actualizarEmpresa:id", verificaToken, function(req, res) {
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
                err,
            });
        }

        if (!empresaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Id no encontrado`,
                },
            });
        }

        console.log(empresaDB);

        res.render("actualizar-empresa", {
            ok: true,
            empresa: empresaDB,
        });
    });
});

// ACTIVAR LA EMPRESA (DAR DE ALTA)
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
                err,
            });
        }

        if (!empresaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Id no encontrado`,
                },
            });
        }

        console.log(empresaDB);

        res.render("acept-empresa", {
            ok: true,
            empresa: empresaDB,
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

        // res.json({
        //     ok: true,
        //     empresaDB,
        // });
        res.render("register-complete", {
            ok: true,
            empresaDB,
        });
    });
});

// ACTUALIZAR STATUS DE EMPREZA (dar de alta empresa)

app.post("/empresa:id:status", verificaToken, function(req, res) {
    let id = req.params.id;
    let status = req.params.status;
    let inicio = status.lastIndexOf(":");
    id = status.substr(0, inicio);
    console.log(id);
    status = status.substr(inicio + 1, status.length);
    console.log(status);
    let body = req.body;

    console.log(body);

    if (status == "true") {
        console.log("Entra true");
        body.status = false;
        body.eliminado = true;
    } else {
        console.log("entra false");
        body.status = true;
    }

    Empresa.findByIdAndUpdate(id, body, { new: true }, (err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.render("auto-actu-sucess", {
            ok: true,
            empresa: empresaDB,
        });
    });
});

// ACTUALIZAR INFORMACION DE EMPRESA (dar de alta empresa)
app.post("/editEmpresa:id", verificaToken, function(req, res) {
    let id = req.params.id;
    id = id.substr(1, id.length - 1);
    console.log("Este es el id", id);
    let body = req.body;
    body.password = bcrypt.hashSync(req.body.password, 10);

    console.log(body);

    Empresa.findByIdAndUpdate(id, body, { new: true }, (err, empresaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.render("auto-actu-sucess", {
            ok: true,
            empresa: empresaDB,
        });
    });
});

// LISTADO DE EMPRESAS
app.get("/company", function(req, res) {
    Empresa.find({ status: true, administrador: false }).exec(
        (err, empresaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            res.render("company", {
                empresa: empresaDB,
            });
        }
    );
});

// HOTELERIA
app.get("/Hoteleria", function(req, res) {
    Empresa.find({ giro_empresarial: "Hoteleria", status: true }).exec(
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

//   Restaurantes/Servicios de comida
app.get("/Restaurantes", function(req, res) {
    Empresa.find({
        giro_empresarial: "Restaurantes/Servicios de comida",
        status: true,
    }).exec((err, empresaDB) => {
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

// Consultoria Empresarial
app.get("/ConsultoriaEmpresarial", function(req, res) {
    Empresa.find({
        giro_empresarial: "Consultoria Empresarial",
        status: true,
    }).exec((err, empresaDB) => {
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

// Medicina
app.get("/Medicina", function(req, res) {
    Empresa.find({ giro_empresarial: "Medicina", status: true }).exec(
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

// Industria
app.get("/Industria", function(req, res) {
    Empresa.find({ giro_empresarial: "Industria", status: true }).exec(
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

// Construcción
app.get("/Construccion", function(req, res) {
    Empresa.find({ giro_empresarial: "Construccion", status: true }).exec(
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

// Servicios
app.get("/Servicios", function(req, res) {
    Empresa.find({ giro_empresarial: "Servicios", status: true }).exec(
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

// Comercio
app.get("/Comercio", function(req, res) {
    Empresa.find({ giro_empresarial: "Comercio", status: true }).exec(
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

// Automoviles
app.get("/Automoviles", function(req, res) {
    Empresa.find({ giro_empresarial: "Automoviles", status: true }).exec(
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

// Veterinaria
app.get("/Veterinaria", function(req, res) {
    Empresa.find({ giro_empresarial: "Veterinaria", status: true }).exec(
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

// Tecnologia
app.get("/Tecnologia", function(req, res) {
    Empresa.find({ giro_empresarial: "Tecnologia", status: true }).exec(
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

// Otros
app.get("/Otros", function(req, res) {
    Empresa.find({ giro_empresarial: "Otros", status: true }).exec(
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

// Emprendedores
app.get("/Emprendedores", function(req, res) {
    Empresa.find({ giro_empresarial: "Emprendedores", status: true }).exec(
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

module.exports = app;