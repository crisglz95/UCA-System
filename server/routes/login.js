const express = require('express');
const Empresa = require('../models/empresa');
const bcrypt = require('bcrypt');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    console.log(body);

    Empresa.findOne({ correo: body.correo }, (err, empresaDB) => {
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
                    message: 'Usuario o Contraseña incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, empresaDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o Contraseña incorrectos'
                }
            });
        }

        res.render('home', {
            empresaDB
        });

        // res.json({
        //     ok: true,
        //     empresa: empresaDB,
        //     message: 'Inicio de sesion Correcto'
        // })

        // let token = jwt.sign({
        //     usuario: usuarioDB
        // }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        // res.json({
        //     ok: true,
        //     usuario: usuarioDB,
        //     token
        // });
    });
});

module.exports = app;