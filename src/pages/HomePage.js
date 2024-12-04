import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ProductList from '../components/ProductList'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]); // Inicializa el estado como un array vacío

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error al recuperar productos:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh', 
                bgcolor: '#f5f5f5', 
                padding: 3,
            }}
        >
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: '#333' }}>
                Página de Inicio
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', color: '#666' }}>
                Bienvenido a Siena Caps
            </Typography>

            {/* Asegúrate de pasar la propiedad products al componente ProductList */}
            <ProductList products={products} addToCart={(product) => console.log(product)} />
        </Box>
    );
};

export default HomePage;
