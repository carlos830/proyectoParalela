const tokens = require('../models/tokens');

function authenticate(req, res) {
    tokens.create(req.body)
        .then(usuario => {
            res.status(200).send({ usuario });
        })

    .catch(err => {
        res.status(500).send({ err });
    })
}



module.exports = {
    authenticate
}