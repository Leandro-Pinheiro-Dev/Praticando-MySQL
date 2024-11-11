const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        console.error('Erro de conexão com o banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

