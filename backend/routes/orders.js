const express = require('express');
const router = express.Router();

// Ruta para obtener todos los pedidos de un usuario (GET)
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    // Consulta para obtener todos los pedidos de un usuario
    req.db.query('SELECT * FROM orders WHERE user_id = ?', [userId], (err, orders) => {
        if (err) {
            return res.status(500).send('Error al obtener los pedidos');
        }
        res.json(orders);
    });
});

// Ruta para realizar un nuevo pedido (POST)
router.post('/', (req, res) => {
    const { userId, total, items } = req.body;

    // Inserción del pedido
    const orderData = { user_id: userId, total };
    req.db.query('INSERT INTO orders SET ?', orderData, (err, result) => {
        if (err) {
            return res.status(500).send('Error al crear el pedido');
        }

        // Obtener el ID del nuevo pedido
        const orderId = result.insertId;

        // Insertar los productos en la tabla `order_items`
        const orderItems = items.map(item => ({
            order_id: orderId,
            product_id: item.productId,
            quantity: item.quantity,
            price: item.price
        }));

        // Insertar múltiples productos de una vez
        req.db.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?', [orderItems.map(item => [item.order_id, item.product_id, item.quantity, item.price])], (err) => {
            if (err) {
                return res.status(500).send('Error al agregar los artículos al pedido');
            }
            res.status(201).send({ message: 'Pedido realizado con éxito' });
        });
    });
});

module.exports = router;
