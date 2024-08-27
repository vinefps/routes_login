const express = require('express');
const cors = require('cors');
const routesAuth = require('./routes/auth');
const routesRegister = require('./routes/register');
const routesLogin = require('./routes/login');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routesAuth);
app.use('/register', routesRegister);
app.use('/login', routesLogin);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
