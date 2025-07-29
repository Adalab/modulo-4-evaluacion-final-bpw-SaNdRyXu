// importaciones

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const port = process.env.DB_PORT || 4000;
require('dotenv').config();


//Crear y configurar el servidor
const server = express();
server.use(cors());
server.use(express.json());
server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    });
