const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const router = express.Router();

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto por tu usuario de MySQL
    password: '', // Cambia esto por tu contraseña de MySQL
    database: 'proyecto', // Cambia esto por tu base de datos
});

// Verificar conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        process.exit(1); // Salir de la aplicación si hay un error de conexión
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para iniciar sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Asegúrate de que se reciban los datos necesarios
    if (!username || !password) {
        return res.status(400).json({ message: 'El nombre de usuario y la contraseña son obligatorios.' });
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error en la consulta de inicio de sesión:', err);
            return res.status(500).json({ message: 'Error en la base de datos' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];

        // Compara la contraseña ingresada con la almacenada en la base de datos
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error al comparar contraseñas:', err);
                return res.status(500).json({ message: 'Error al comparar contraseñas' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            // Generar un token JWT
            const token = jwt.sign({ id: user.id, role: user.role }, 'tu_secreto', { expiresIn: '1h' });
            return res.status(200).json({ token, role: user.role });
        });
    });
});

// Ruta para registrarse
router.post('/register', (req, res) => {
    const { username, password, role } = req.body;

    // Asegúrate de que se reciban los datos necesarios
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'El nombre de usuario, la contraseña y el rol son obligatorios.' });
    }

    // Verifica si el usuario ya existe
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error al verificar usuario existente:', err);
            return res.status(500).json({ message: 'Error en la base de datos' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hash de la contraseña antes de almacenarla
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al encriptar la contraseña:', err);
                return res.status(500).json({ message: 'Error al encriptar la contraseña' });
            }

            const newUser = { username, password: hashedPassword, role };

            // Insertar nuevo usuario en la base de datos
            db.query('INSERT INTO users SET ?', newUser, (err, result) => {
                if (err) {
                    console.error('Error al registrar el usuario:', err);
                    return res.status(500).json({ message: 'Error al registrar el usuario' });
                }

                return res.status(201).json({ message: 'Usuario registrado exitosamente' });
            });
        });
    });
});

// Exportar las rutas
module.exports = router;
