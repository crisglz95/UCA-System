const express = require('express');
const fs = require('fs');
const path = require('path');

const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

app.get('/imagen', verificaToken, (req, res) => {
    let img = req.empresa.imagen;
    console.log(img);
    //let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${ img }`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let noImgPath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImgPath);

    }
})


module.exports = app;