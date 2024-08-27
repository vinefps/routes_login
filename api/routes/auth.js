const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Token é necessário');

    jwt.verify(token, process.env.JWT_SECRET, (err, id) => {
        if (err) return res.status(403).send('Token inválido');
        req.id = id;
        next();
    });
}

router.get('/', authenticateToken, (req, res) => {
    res.json({ message: 'Esta é uma rota protegida', user: req.id });
});

module.exports = router; // Certifique-se de que router é exportado corretamente
