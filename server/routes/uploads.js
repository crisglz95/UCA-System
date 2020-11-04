const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

const Empresa = require("../models/empresa");
const Cupon = require("../models/cupon");
const Donacion = require('../models/donaciones');
const { verificaToken } = require("../middlewares/autenticacion");

const fs = require("fs");
const path = require("path");

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'wolf-code',
    api_key: '622561925972199',
    api_secret: '1QsmR8t0FawDTGPeYsXqkhnhL04'
});

app.use(fileUpload({ useTempFiles: true }));

app.get("/subirImagen", verificaToken, function(req, res) {
    res.render("agregar-foto", {});
});

app.post("/upload", verificaToken, function(req, res) {
    //tenia id
    //let id = req.params.id;
    let id = req.empresa._id;
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: "No se ha seleccionado ningun archivo",
        });
    }

    //let archivo = req.files.archivo;
    let archivo = req.files.imagen_cupon;
    console.log('path', archivo.tempFilePath);
    let nombreCortado = archivo.name.split(".");
    console.log(nombreCortado);
    console.log(nombreCortado.length);
    let extencion = nombreCortado[nombreCortado.length - 1];
    console.log(extencion);
    let extencionesValidas = ["png", "jpg", "gif", "jpeg"];

    if (extencionesValidas.indexOf(extencion) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Las extenciones permitidas son " + extencionesValidas.join(","),
                ext: extencion,
            },
        });
    }

    // let nombreArchivo = `${id} - ${new Date().getMilliseconds()}.${extencion}`;
    let nombreArchivo = `${id} - ${new Date().getMilliseconds()}`;

    //Implementacion de Cloudinary
    //cloudinary.v2.uploader.upload("../../public/assets/uploads/no-image.jpg", function(err, res) { console.log(res, err); });
    cloudinary.uploader.upload(archivo.tempFilePath, {public_id: `uca/${nombreArchivo}`, tags: `blog`}, 
        function(err, image){
            if(err) res.send(err);
            console.log('File upload with cloudinary');
            // res.json(image);
        }
    )

    archivo.mv(`public/assets/uploads/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        nombreArchivo = `${nombreArchivo}.${extencion}`;
        imagenEmpresa(id, res, nombreArchivo);
    });
});

app.post("/upload-cupon:id", verificaToken, function(req, res) {
    //tenia id
    let id = req.params.id;
    id = id.substr(1, id.length - 1);
    //let id = req.empresa._id;
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: "No se ha seleccionado ningun archivo",
        });
    }

    //let archivo = req.files.archivo;
    let archivo = req.files.imagen_cupon;
    let nombreCortado = archivo.name.split(".");
    console.log(nombreCortado);
    console.log(nombreCortado.length);
    let extencion = nombreCortado[nombreCortado.length - 1];
    console.log(extencion);
    let extencionesValidas = ["png", "jpg", "gif", "jpeg"];

    if (extencionesValidas.indexOf(extencion) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Las extenciones permitidas son " + extencionesValidas.join(","),
                ext: extencion,
            },
        });
    }

    let nombreArchivo = `${id} - ${new Date().getMilliseconds()}`;

    cloudinary.uploader.upload(archivo.tempFilePath, {public_id: `uca/${nombreArchivo}`, tags: `blog`}, 
        function(err, image){
            if(err) res.send(err);
            console.log('File upload with cloudinary');
            // res.json(image);
        }
    )

    archivo.mv(`public/assets/uploads/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        imagenCupon(id, res, nombreArchivo);
    });
});

app.post("/upload-donacion:id", verificaToken, function(req, res) {
    //tenia id
    let id = req.params.id;
    id = id.substr(1, id.length - 1);
    //let id = req.empresa._id;
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: "No se ha seleccionado ningun archivo",
        });
    }

    //let archivo = req.files.archivo;
    let archivo = req.files.imagen_cupon;
    let nombreCortado = archivo.name.split(".");
    console.log(nombreCortado);
    console.log(nombreCortado.length);
    let extencion = nombreCortado[nombreCortado.length - 1];
    console.log(extencion);
    let extencionesValidas = ["png", "jpg", "gif", "jpeg"];

    if (extencionesValidas.indexOf(extencion) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Las extenciones permitidas son " + extencionesValidas.join(","),
                ext: extencion,
            },
        });
    }

    let nombreArchivo = `${id} - ${new Date().getMilliseconds()}`;

    cloudinary.uploader.upload(archivo.tempFilePath, {public_id: `uca/${nombreArchivo}`, tags: `blog`}, 
        function(err, image){
            if(err) res.send(err);
            console.log('File upload with cloudinary');
            // res.json(image);
        }
    )

    archivo.mv(`public/assets/uploads/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        imagenDonacion(id, res, nombreArchivo);
    });
});

function imagenDonacion(id, res, nombreArchivo) {
    Donacion.findById(id, (err, empresaDB) => {
        if (err) {
            borrarArchivo(nombreArchivo);
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!empresaDB) {
            borrarArchivo(nombreArchivo);
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Empresa no existe`,
                },
            });
        }

        borrarArchivo(empresaDB.imagen);

        empresaDB.imagen = nombreArchivo;
        empresaDB.save((err, logoEmpresa) => {
            res.render("LogoExito", {
                ok: true,
                empresa: logoEmpresa,
                img: nombreArchivo,
                texto: 'Donacion'
            });
        });
    });
}

function imagenCupon(id, res, nombreArchivo) {
    Cupon.findById(id, (err, empresaDB) => {
        if (err) {
            borrarArchivo(nombreArchivo);
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!empresaDB) {
            borrarArchivo(nombreArchivo);
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Empresa no existe`,
                },
            });
        }

        borrarArchivo(empresaDB.imagen_cupon);

        empresaDB.imagen_cupon = nombreArchivo;
        empresaDB.save((err, logoEmpresa) => {
            res.render("LogoExito", {
                ok: true,
                empresa: logoEmpresa,
                img: nombreArchivo,
                texto: 'Cupon'
            });
        });
    });
}

function imagenEmpresa(id, res, nombreArchivo) {
    Empresa.findById(id, (err, empresaDB) => {
        if (err) {
            borrarArchivo(nombreArchivo);
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!empresaDB) {
            borrarArchivo(nombreArchivo);
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Empresa no existe`,
                },
            });
        }

        borrarArchivo(empresaDB.imagen);

        empresaDB.imagen = nombreArchivo;
        empresaDB.save((err, logoEmpresa) => {
            res.render("LogoExito", {
                ok: true,
                empresa: logoEmpresa,
                img: nombreArchivo,
                texto: 'Empresa'
            });
        });
    });
}

function borrarArchivo(nombreImagen) {
    let pathImagen = path.resolve(
        __dirname,
        `../../public/assets/uploads/${nombreImagen}`
    );
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;