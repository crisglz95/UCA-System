const express = require("express");
const Empresa = require("../models/empresa");
const cupon = require("../models/cupon");
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// const fileUpload = require('express-fileupload');
const app = express();

// const fs = require('fs');
// const path = require('path');

// app.use(fileUpload({ useTempFiles: true, safeFileNames: true, preserveExtension: true }));

const { verificaToken } = require("../middlewares/autenticacion");

// LISTAR CUPONES GENERALES
app.get("/listarCupones", function(req, res) {
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

app.get('/eliminaCupon:id', function(req, res) {
    let id = req.params.id;
    id = id.substr(1, id.length - 1);
    let body = req.body;

    cupon.findById(id, (err, cuponDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!cuponDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Id no encontrado`
                }
            })
        }

        console.log(cuponDB);
        res.render('cupon-eliminar', {
            ok: true,
            cupon: cuponDB
        })
    })

})

app.post('/eliminarCupon:id', function(req, res) {
    let id = req.params.id;
    id = id.substr(1, id.length - 1);
    let body = req.body;
    let status = true;

    body.eliminado = status;

    cupon.findByIdAndUpdate(id, body, { new: true }, (err, cuponDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.render('home-sys', {})
    });
});

app.get('/ver-info:id', function(req, res) {
    let id = req.params.id;
    id = id.substr(1, id.length - 1);
    let body = req.body;

    cupon.findById(id, (err, cuponDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!cuponDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Id no encontrado`
                }
            })
        }

        // res.json({
        //     idCupon: id,
        //     cupon: cuponDB
        // })

        console.log(cuponDB);

        res.render('cupon-ver-sys', {
            ok: true,
            cupon: cuponDB
        })
    })


});

// LISTAR CUPONES DESCUENTOS
app.get("/CuponesDescuentos", function(req, res) {
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
app.get("/CuponesPromociones", function(req, res) {
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
app.get("/CuponesEstudiantes", function(req, res) {
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
app.get("/CuponesEnviosGratis", function(req, res) {
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
    let id = req.empresa._id;
    // let archivo = req;
    // console.log('Comienza Req', archivo);
    // if (archivo !== undefined) {
    //     let nombreCortado = archivo.name.split('.');
    //     let extencion = nombreCortado[nombreCortado.length - 1];
    //     let extencionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    //     if (extencionesValidas.indexOf(extencion) > 0) {
    //         let nombreArchivo = `Cupon${id} - ${new Date().getMilliseconds}.${extencion}`;
    //         console.log(nombreArchivo);
    //         archivo.mv(`uploads/${nombreArchivo}`, (err) => {
    //             body.imagen_cupon = nombreArchivo;
    //         })
    //     }
    // }
    body.empresa = req.empresa._id;

    let CUPON = new cupon(body);

    CUPON.save((err, cuponStored) => {
        if (err) res.status(500).send({ message: `Error al salvar bd ${err}` });
        console.log(cuponStored);
        res.render("agregar-foto-cupon", { //tenia register-success
            CUPON: cuponStored,
            enlace: "/sistemaCupones",
            boton: "Cupones",
        });
    });
});

module.exports = app;