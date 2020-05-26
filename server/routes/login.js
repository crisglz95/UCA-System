const express = require("express");
const Empresa = require("../models/empresa");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const store = require("store");

const app = express();

app.post("/login", (req, res) => {
    let body = req.body;
    console.log(body);

    Empresa.findOne({ correo: body.correo }, (err, empresaDB) => {
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
                    message: "Usuario o Contraseña incorrectos",
                },
            });
        }

        if (!bcrypt.compareSync(body.password, empresaDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o Contraseña incorrectos",
                },
            });
        }

        if (empresaDB.status === false) {
            return res.render('validacion-pendiente', {
                ok: false,
                err: true,
                message: 'Empresa no validada'
            })
        }

        let token = jwt.sign({
                empresa: empresaDB,
            },
            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }
        );

        console.log(empresaDB);

        res.cookie("token", token, { httpOnly: true });

        // store.set('token', { token });

        // res.setHeader('token', token);

        if (empresaDB.administrador === true) {
            return res.render("admin-sys", {
                empresaDB,
                ok: true,
                empresa: empresaDB,
            });
        }

        res.render("home-sys", {
            empresaDB,
            ok: true,
            empresa: empresaDB,
        });

        // res.json({
        //     ok: true,
        //     empresa: empresaDB,
        // });

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