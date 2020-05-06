const express = require('express');
const app = express();

app.use(require('./empresa'));
app.use(require('./cupon'));
app.use(require('./uploads'));

app.get('/', (req, res) => {
    res.render('home', {

    });
})

module.exports = app;