const { verify } = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        // console.log('Received Token:', token);
        req.token = token;
        next();
    } else {
        res.send({
            result: "token is not valid"
        });
    }
}

module.exports = verifyToken;
