require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();


const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));
//express hbs
app.set('view engine', 'hbs');

app.use(require('./routes/index'));

mongoose.connect('mongodb://localhost:27017/FormularioEmpresas', (err, res) => {
    if (err) throw err;

    console.log('Base de dato ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});