import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useCart } from '../context/CartContext';  // Asumimos que tienes un contexto de carrito

const ProductDetails = () => {
  const { name } = useParams();  // Obtener el parámetro 'name' desde la URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();  // Función para agregar al carrito

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/name/${name}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error loading product details:', error));
  }, [name]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,  // Agregar una cantidad predeterminada de 1
      });
      alert('Producto agregado al carrito');
    }
  };

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Imagen del producto */}
        <Grid item xs={12} md={6}>
          <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
        </Grid>

        {/* Información del producto */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>{product.name}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 4 }}>${product.price}</Typography>

          {/* Botón para agregar al carrito */}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddToCart} 
            sx={{ width: '100%', py: 2 }}
          >
            Agregar al carrito
          </Button>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetails;
