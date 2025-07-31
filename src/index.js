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

// Conexión a la base de datos
const getConnection = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });
};


server.get('/frases', async (req, res) => {
    const conn = await getConnection();

    const [result] = await conn.query(`
        SELECT f.texto AS frase, p.nombre AS nombre_personaje, p.apellido AS apellido_personaje, c.titulo AS titulo_capitulo 
        FROM frases f
        JOIN personajes p ON f.fk_id = p.id
        JOIN personajes_capitulos pc ON p.id = pc.personaje_id
        JOIN capitulos c ON pc.capitulo_id = c.id`);

    await conn.end();
    res.json(result)

});

server.get('/frases/:id', async (req, res) => {
    const id = req.params.id;
    const conn = await getConnection();

    const [result] = await conn.query(`
        SELECT f.texto AS frase, p.nombre AS nombre_personaje, p.apellido AS apellido_personaje, c.titulo AS titulo_capitulo 
        FROM frases f
        JOIN personajes p ON f.fk_id = p.id
        JOIN personajes_capitulos pc ON p.id = pc.personaje_id
        JOIN capitulos c ON pc.capitulo_id = c.id
        WHERE f.id = ?`, [id]);

    if (result.length === 0) {
        res.status(404).json({ error: 'Frase no encontrada' });
        return;
    }
    await conn.end();
    res.json(result);   
});





