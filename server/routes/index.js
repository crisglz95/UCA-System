const express = require('express');
const app = express();

app.use(require('./empresa'));
app.use(require('./cupon'));
app.use(require('./uploads'));

app.get('/', (req, res) => {
    res.render('home', {

    });
});


app.get('/company', (req, res) => {
    res.render('company', {

    });
});

app.get('/login', (req, res) => {
    res.render('login', {

    });
});

module.exports = app;