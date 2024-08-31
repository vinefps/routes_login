const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
    const { password, email } = req.body; 

    try {
        const foundUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (foundUser) {
            const match = await bcrypt.compare(password, foundUser.password);

            if (match) {
                const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ message: 'Login realizado com sucesso', token, name:foundUser.name });
            } else {
                res.status(401).send('Falha no login');
            }
        } else {
            res.status(404).send('Usuário não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).send('Erro interno no servidor');
    }
});

module.exports = router; // Certifique-se de que router é exportado corretamente
