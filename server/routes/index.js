const express = require("express");
const app = express();

const { verificaToken } = require('./../middlewares/autenticacion');

app.use(require("./empresa"));
app.use(require("./uploads"));
app.use(require("./login"));
app.use(require("./cupon"));
app.use(require("./donaciones"));
app.use(require("./enlaces"))
app.use(require("./consultoria_y_capacitacion"));
app.use(require('./imagenes'));

app.get("/", (req, res) => {
    res.render("home", {});
});

// app.get("/registro-completo", (req, res) => {
//     res.render("register-complete", {});
// });


// app.get("/company", (req, res) => {
//     res.render("company", {});
// });

// app.get("/login", (req, res) => {
//     res.render("login", {});
// });

// app.get("/cupon", (req, res) => {
//     res.render("cupon", {});
// });

// //Redireccionamiento de menu lateral
// app.get("/sistemaHome", verificaToken, (req, res) => {
//     res.render('home-sys', {
//         empresa: req.empresa
//     })
// })

// app.get("/sistemaCupones", verificaToken, (req, res) => {
//     console.log(req.empresa);
//     res.render("cupones-sys", {
//         empresa: req.empresa
//     });
// });

// app.get("/sistemaDonaciones", verificaToken, (req, res) => {
//     console.log(req.empresa);
//     res.render("donaciones-sys", {
//         empresa: req.empresa
//     });
// });

module.exports = app;