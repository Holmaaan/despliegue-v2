import React from 'react';
import {
    Dialog,
    DialogContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const CartModal = ({ open, onClose }) => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate(); // Inicializar navigate

    // Calcular el total del carrito
    const totalValue = cartItems.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    Carrito de Compras
                </Typography>
                <List>
                    {cartItems.map((product) => (
                        <ListItem key={product.id}>
                            <ListItemText
                                primary={product.name}
                                secondary={`$${product.price} × ${product.quantity}`}
                            />
                            <IconButton
                                onClick={() =>
                                    updateQuantity(product.id, product.quantity - 1)
                                }
                                disabled={product.quantity <= 1}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <Typography>{product.quantity}</Typography>
                            <IconButton
                                onClick={() =>
                                    updateQuantity(product.id, product.quantity + 1)
                                }
                            >
                                <AddIcon />
                            </IconButton>
                            <IconButton onClick={() => removeFromCart(product.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Total: ${totalValue.toFixed(2)}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/Orden')} // Redirigir a la página de pedidos
                    sx={{ mt: 2 }}
                >
                    Realizar Pedido
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default CartModal;