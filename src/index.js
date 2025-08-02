const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const port = process.env.DB_PORT || 4000;
require('dotenv').config();


// Configuración del servidor
const server = express();
server.use(cors());
server.use(express.json());
server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
    });

// Conexión a bbdd
const getConnection = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });
};


server.get('/frases', async (req, res) => {
    try {
        const conn = await getConnection();
        const [results] = await conn.query('SELECT f.id, f.texto AS frase, p.nombre AS nombre_personaje, p.apellido AS apellido_personaje, c.titulo AS titulo_capitulo FROM frases f LEFT JOIN personajes p ON f.personaje_id = p.id LEFT JOIN personajes_capitulos pc ON p.id = pc.personaje_id LEFT JOIN capitulos c ON pc.capitulo_id = c.id');

        await conn.end();
        res.json(results);
        } 
    catch (error) {
        console.error('Error al obtener las frases:', error);
}});

server.get('/frases/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const conn = await getConnection();
         const [results] = await conn.query('SELECT f.id, f.texto AS frase, p.nombre AS nombre_personaje, p.apellido AS apellido_personaje, c.titulo AS titulo_capitulo FROM frases f LEFT JOIN personajes p ON f.personaje_id = p.id LEFT JOIN personajes_capitulos pc ON p.id = pc.personaje_id LEFT JOIN capitulos c ON pc.capitulo_id = c.id WHERE f.id = ?', [id]);
        await conn.end();
        if (results.length === 0){
            return res.status(404).json({error: 'Frase no encontrada'});
        }
        res.status(200).json(results[0]);

    }
    catch (error) {
        res.status(500).json({error: error });
    }
});

server.get('/frases/personaje/:personaje_id', async (req, res) => {
    const personajeId = req.params.personaje_id;
    try {
        const conn = await getConnection();
        const [results] = await conn.query('SELECT f.texto AS frase, p.nombre AS nombre_personaje, p.apellido AS apellido_personaje, c.titulo AS titulo_capitulo FROM frases f LEFT JOIN personajes p ON f.personaje_id = p.id LEFT JOIN personajes_capitulos pc ON p.id = pc.personaje_id LEFT JOIN capitulos c ON pc.capitulo_id = c.id WHERE f.personaje_id = ?', [personajeId]);
        await conn.end();
        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontraron frases para este personaje' });
        }
        res.status(200).json(results[0]);

    } catch (error) {
        
        res.status(500).json({ error: error });
    }
});

server.get('/frases/capitulo/:capitulo_id', async (req, res) => {
    const capituloId = req.params.capitulo_id;
    try {
        const conn = await getConnection();
        const [results] = await conn.query('SELECT f.texto AS frase, p.nombre AS nombre_personaje, p.apellido AS apellido_personaje, c.titulo AS titulo_capitulo FROM frases f LEFT JOIN personajes p ON f.personaje_id = p.id LEFT JOIN personajes_capitulos pc ON p.id = pc.personaje_id LEFT JOIN capitulos c ON pc.capitulo_id = c.id WHERE c.id = ?', [capituloId]);
        await conn.end();
        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontraron frases para este capítulo' });
        }
        res.status(200).json(results[0]);

    } catch (error) {
        res.status(500).json({ error: error });
    }
});



server.get('/personaje', async (req, res) => {
    const { nombre, apellido } = req.query;

    if (!nombre || !apellido) {
        return res.status(400).json({ error: 'Faltan parámetros de búsqueda' });
    }

    try {
        const conn = await getConnection();
        const [results] = await conn.query('SELECT f.texto AS frase, p.nombre AS nombre_personaje, p.apellido AS apellido_personaje, c.titulo AS titulo_capitulo FROM frases f LEFT JOIN personajes p ON f.personaje_id = p.id LEFT JOIN personajes_capitulos pc ON p.id = pc.personaje_id LEFT JOIN capitulos c ON pc.capitulo_id = c.id WHERE p.nombre = ? AND p.apellido = ?', [nombre, apellido]);
        await conn.end();
        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontraron frases para este personaje' });
        }
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ error: error });
    }
});





server.get('/capitulos', async (req, res) => {
    try {
        const conn = await getConnection();
        const [results] = await conn.query('SELECT c.titulo AS titulo_capitulo, c.numero_episodio AS numero_episodio, c.temporada AS temporada, c.sinopsis AS sinopsis, p.nombre AS nombre_personaje, p.apellido AS apellido_personaje FROM capitulos c LEFT JOIN personajes_capitulos pc ON c.id = pc.capitulo_id LEFT JOIN personajes p ON pc.personaje_id = p.id');
        await conn.end();
        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontraron capítulos' });
        }
        res.status(200).json(results);
    }
    catch (error) {
        console.error('Error al obtener los capítulos:', error);
        return res.status(500).json({ error: 'Error al obtener los capítulos' });
    }
});


server.put('/frases/:id', async (req, res) => {
    const id = req.params.id;
    const {texto} = req.body;

    try{
        const conn = await getConnection();       
        let sql = 'UPDATE frases SET texto = ? WHERE id = ?';
        const [results] = await conn.query(sql, [texto, id]);
        await conn.end();

        if (results.affectedRows === 0){
            return res.status(404).json({ success: false, error: 'Frase no encontrada'});
        }

        res.json({success: true});

    }
    catch (error) {
        res.status(500).json({error: 'Error al actualizar la frase'});
    }

});


server.post('/frases', async (req, res) => {
  const { texto, marca_tiempo, descripcion, nombre, apellido, titulo } = req.body;

  try {
    const conn = await getConnection();
   
    const [existing] = await conn.query('SELECT * FROM frases WHERE texto = ?', [texto]);
    if (existing.length > 0) {
      await conn.end();
      return res.status(400).json({ error: 'La frase ya existe' });
    }

    const [pResults] = await conn.query('SELECT id FROM personajes WHERE nombre = ? AND apellido = ?',[nombre, apellido]);
    let personajeId = pResults[0]?.id;

    if (!personajeId) {
      const [insertP] = await conn.query('INSERT INTO personajes (nombre, apellido) VALUES (?, ?)',[nombre, apellido]);
      personajeId = insertP.insertId;
    }

    const [cResults] = await conn.query('SELECT id FROM capitulos WHERE titulo = ?',[titulo]);
    let capituloId = cResults[0]?.id;

    if (!capituloId) {
      const [insertC] = await conn.query('INSERT INTO capitulos (titulo) VALUES (?)',[titulo]);
      capituloId = insertC.insertId;
    }

    await conn.query('INSERT IGNORE INTO personajes_capitulos (personaje_id, capitulo_id) VALUES (?, ?)',[personajeId, capituloId]);

    let sql = 'INSERT INTO frases (texto, marca_tiempo, descripcion, personaje_id) VALUES (?, ?, ?, ?)';
    const results = await conn.query(sql, [texto, marca_tiempo, descripcion, personajeId]);

    await conn.end();

    res.status(200).json({
      success: true,
      id: results.insertId
    });

  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al insertar la frase' });
  }
});


// Delete
server.delete('/frases/:id', async (req, res) => {
    const id = req.params.id;
    

    try{
        const conn = await getConnection();       
        let sql = 'DELETE FROM frases WHERE id = ?';
        const [results] = await conn.query(sql, [id]);
        await conn.end();

        if (results.affectedRows === 0){
            return res.status(404).json({ success: false, error: 'Frase no encontrada'});
        }

        res.json({success: true});

    }
    catch (error) {
        res.status(500).json({error: 'Error al actualizar la frase'});
    }

});
  





