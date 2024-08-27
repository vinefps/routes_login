const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Token recebido:', token);
    console.log('Chave secreta usada:', process.env.JWT_SECRET);


    if (!token) return res.status(401).send('Token is required');

    jwt.verify(token, process.env.JWT_SECRET, (err, id) => {
        if (err) {
            console.error("Erro na verificação do token:", err);
            return res.status(403).send('Invalid token');
        }
        req.id = id;
        next();
    });

}

module.exports = authenticateToken;