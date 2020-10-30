require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const hbs = require('hbs');


const bodyParser = require('body-parser');

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));
//express hbs
app.set('view engine', 'hbs');
console.log(__dirname + '/../views/partial');
hbs.registerPartials(__dirname + '/../views/partials');

app.use(require('./routes/index'));

//mongodb://localhost:27017/FormularioEmpresas

mongoose.connect('mongodb+srv://Negocity_UserBD:UCA123@cluster0.ajoeg.mongodb.net/test', (err, res) => {
    if (err) throw err;

    console.log('Base de dato ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});