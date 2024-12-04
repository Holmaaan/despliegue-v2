// routes/products.js
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

// Obtener todos los productos
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const { name, image, quantity, price } = req.body;
    db.query('INSERT INTO products (name, image, quantity, price) VALUES (?, ?, ?, ?)', [name, image, quantity, price], (err, results) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, name, image, quantity, price });
    });
});

// Actualizar un producto
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, image, quantity, price } = req.body;
    db.query('UPDATE products SET name = ?, image = ?, quantity = ?, price = ? WHERE id = ?', [name, image, quantity, price, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, name, image, quantity, price });
    });
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send(); // No content
    });
});

module.exports = router;
