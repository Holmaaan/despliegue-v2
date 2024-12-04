import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Button, Typography, IconButton, TextField } from '@mui/material';
import { useCart } from '../context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (id, e) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            updateQuantity(id, newQuantity);  // Actualiza la cantidad solo si es un número válido
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Carrito de Compras
            </Typography>
            {cartItems.length === 0 ? (
                <Typography>No tienes productos en tu carrito.</Typography>
            ) : (
                cartItems.map((product) => (
                    <Card key={product.id} sx={{ display: 'flex', marginBottom: 2, padding: 2, boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            alt={product.name}
                            height="100"
                            image={product.image}
                            sx={{ width: 100, objectFit: 'cover', marginRight: 2 }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Precio: ${product.price.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Cantidad:
                                    <TextField
                                        type="number"
                                        value={product.quantity}
                                        onChange={(e) => handleQuantityChange(product.id, e)}
                                        inputProps={{ min: 1 }}
                                        sx={{ width: 50, marginLeft: 1 }}
                                    />
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <IconButton onClick={() => removeFromCart(product.id)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default Cart;
