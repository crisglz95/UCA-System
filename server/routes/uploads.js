const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Empresa = require('../models/empresa');

const fs = require('fs');
const path = require('path');

app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:id', function(req, res) {
    let id = req.params.id;
    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                message: 'No se ha seleccionado ningun archivo'
            });
    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    console.log(nombreCortado);
    console.log(nombreCortado.length);
    let extencion = nombreCortado[nombreCortado.length - 1];
    console.log(extencion);
    let extencionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extencionesValidas.indexOf(extencion) < 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'Las extenciones permitidas son ' + extencionesValidas.join(','),
                    ext: extencion
                }
            });
    }

    let nombreArchivo = `${ id } - ${ new Date().getMilliseconds() }.${ extencion }`;
    archivo.mv(`uploads/${ nombreArchivo }`, (err) => {
        if (err) {
            return res.status(500)
                .json({
                    ok: false,
                    err
                });
        }
        imagenEmpresa(id, res, nombreArchivo);
    });
});

function imagenEmpresa(id, res, nombreArchivo) {
    Empresa.findById(id, (err, empresaDB) => {
        if (err) {
            borrarArchivo(nombreArchivo);
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!empresaDB) {
            borrarArchivo(nombreArchivo);
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Empresa no existe`
                }
            });
        }

        borrarArchivo(empresaDB.imagen);

        empresaDB.imagen = nombreArchivo;
        empresaDB.save((err, logoEmpresa) => {
            res.json({
                ok: true,
                empresa: logoEmpresa,
                img: nombreArchivo
            });
        });
    });
}

function borrarArchivo(nombreImagen) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;