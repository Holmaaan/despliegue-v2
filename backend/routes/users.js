// routes/users.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Configuración de la conexión a la base de datos (puedes mover esto a un archivo separado si lo prefieres)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto por tu usuario de MySQL
    password: '', // Cambia esto por tu contraseña de MySQL
    database: 'proyecto' // Cambia esto por el nombre de tu base de datos
});

// Obtener todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const { username, password, role } = req.body;
    db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], (err, results) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, username, role });
    });
});

// Actualizar un usuario
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    db.query('UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?', [username, password, role, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, username, role });
    });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send(); // No content
    });
});

module.exports = router;
