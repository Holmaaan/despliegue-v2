import React from 'react';
import { Box, Card, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useCart } from '../context/CartContext';  // Importar useCart para acceder al contexto del carrito

const ProductList = ({ products }) => {
    const { addToCart } = useCart();  // Usar el hook useCart para acceder a addToCart

    // Verifica si products es undefined o no es un array
    if (!products || !Array.isArray(products)) {
        return <Typography>No hay productos disponibles.</Typography>; // Mensaje alternativo si no hay productos
    }

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                gap: 2,
            }}
        >
            {products.map((product) => (
                <Card 
                    key={product.id} 
                    sx={{ 
                        width: 250, 
                        boxShadow: 3, 
                        transition: '0.3s', 
                        borderRadius: '8px', 
                        '&:hover': {
                            boxShadow: 6,
                        },
                    }}
                >
                    <CardMedia
                        component="img"
                        alt={product.name}
                        height="200"
                        image={product.image}
                        sx={{ 
                            objectFit: 'cover', 
                            borderTopLeftRadius: '8px', 
                            borderTopRightRadius: '8px', 
                        }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Cantidad: {product.quantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                            Precio: ${product.price.toFixed(2)}
                        </Typography>
                        <Button 
                            size="small" 
                            sx={{ 
                                backgroundColor: 'black', 
                                color: 'white', 
                                '&:hover': {
                                    backgroundColor: '#333', 
                                },
                                mt: 1,
                                '&:active': {
                                    backgroundColor: '#555', 
                                },
                            }}
                            onClick={() => addToCart(product)} // Llama a la función addToCart cuando se hace clic
                        >
                            Añadir al carrito
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default ProductList;
