const express = require('express');
const app = express();

app.use(require('./empresa'));
app.use(require('./cupon'));
app.use(require('./uploads'));

module.exports = app;