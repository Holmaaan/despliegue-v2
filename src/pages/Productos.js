import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';  // Asegúrate de importar el contexto

const Productos = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Obtiene la función addToCart del contexto

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error loading products:', error));
  }, []);

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>Gorras</Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img" height="140" image={product.image} alt={product.name} />
              <CardContent>
                <Typography gutterBottom variant="h5">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                <Typography variant="h6" color="primary">${product.price.toFixed(2)}</Typography>

                {/* Botón para añadir al carrito */}
                <Button
                  variant="contained"
                  color="#f5f5f5"
                  fullWidth
                  onClick={() => addToCart(product)}  // Llamada a addToCart al hacer clic
                  sx={{ marginTop: '8px' }}
                >
                  Añadir al carrito
                </Button>

                {/* Botón para ver los detalles del producto */}
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Productos;
