const jwt = require('jsonwebtoken');
//====================
// Verificar token
//====================

let verificaToken = (req, res, next) => {
    // let token = req.get('token');
    let token = req.cookies.token;

    if (!token) {
        return res.render('token_finalizado', {});
    }

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
            // return res.render('home', {});
        }

        req.empresa = decoded.empresa;
    })

    next();
}

module.exports = {
    verificaToken
}