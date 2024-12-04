import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';
import { useCart } from '../context/CartContext';

const Pedido = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [error, setError] = useState('');
  const [codigoDescuento, setCodigoDescuento] = useState('');

  const calcularTotal = () => cartItems.reduce((total, p) => total + p.price * p.quantity, 0);

  const calcularTotalConDescuento = () => {
    let total = calcularTotal();
    if (codigoDescuento === 'DESCUENTO10') {
      total *= 0.9;
    }
    return total;
  };

  const handleRealizarPedido = async () => {
    const pedidoData = {
      nombre,
      direccion,
      telefono,
      correo,
      metodoPago,
      total: calcularTotalConDescuento(),
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Pedido realizado con éxito');
        clearCart(); // Limpiar el carrito después del pedido
      } else {
        setError(data.error || 'Error al realizar el pedido');
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, p: 4, bgcolor: 'grey.100' }}>
      {/* Información de envío */}
      <Box sx={{ flex: 1, bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>Información de envío</Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth />
          <TextField label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} fullWidth />
          <TextField label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} fullWidth />
          <TextField label="Correo Electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} fullWidth />
          <InputLabel id="metodo-pago-label">Método de Pago</InputLabel>
          <Select labelId="metodo-pago-label" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} fullWidth>
            <MenuItem value="">Seleccione método de pago</MenuItem>
            <MenuItem value="contraentrega">Pago contra entrega</MenuItem>
          </Select>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>

      {/* Resumen del carrito */}
      <Box sx={{ flex: 1, bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>Resumen de compra</Typography>
        {cartItems.length > 0 ? (
          cartItems.map((product) => (
            <Box key={product.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '1px solid grey.300' }}>
              <Typography>{product.name}</Typography>
              <Typography>{product.quantity} x ${product.price.toFixed(2)}</Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', py: 4 }}>El carrito está vacío. Agrega productos para realizar un pedido.</Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${calcularTotalConDescuento().toFixed(2)}</Typography>
        </Box>
        <Button onClick={handleRealizarPedido} fullWidth sx={{ mt: 4, py: 2, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'grey.900' } }}>Realizar pedido</Button>
      </Box>
    </Box>
  );
};

export default Pedido;
