const express = require('express');
const Empresa = require('../models/empresa');

const app = express();

app.get('/cupon', function(res, req) {
    console.log('Ingresa Cupon');
});

module.exports = app;