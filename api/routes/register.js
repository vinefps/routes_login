const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: name,
                password: hashedPassword,
                email: email,
            },
        });

        res.status(201).json({
            status: 'Usuário registrado com sucesso',
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao registrar');
    }
});

module.exports = router; // Certifique-se de que router é exportado corretamente
