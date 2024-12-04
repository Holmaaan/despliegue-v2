import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AuthModal from './AuthModal'; // Asegúrate de que la ruta sea correcta
import CartModal from './CartModal'; // Componente de modal de carrito
import { useCart } from '../context/CartContext'; // Importar el hook

const Navbar = ({ setUserRole }) => {
    const [modalOpen, setModalOpen] = React.useState(false); // Modal de autenticación
    const [cartModalOpen, setCartModalOpen] = React.useState(false); // Modal del carrito

    const { cartItems } = useCart(); // Acceder a los productos del carrito

    const handleOpenAuthModal = () => {
        setModalOpen(true);
    };

    const handleCloseAuthModal = () => {
        setModalOpen(false);
    };

    const handleOpenCartModal = () => {
        setCartModalOpen(true);
    };

    const handleCloseCartModal = () => {
        setCartModalOpen(false);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                    <Button color="inherit" component={Link} to="/" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>
                        Inicio
                    </Button>
                    <Button color="inherit" component={Link} to="/productos" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>
                        Gorras
                    </Button>
                    <Button color="inherit" component={Link} to="/acercade" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px' }}>
                        Acerca
                    </Button>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <IconButton color="inherit" onClick={handleOpenAuthModal}>
                        <PersonIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={handleOpenCartModal}>
                        <ShoppingCartIcon />
                    </IconButton>
                </Box>
            </Toolbar>

            {/* Modal de autenticación */}
            <AuthModal open={modalOpen} onClose={handleCloseAuthModal} setUserRole={setUserRole} />

            {/* Modal del carrito */}
            <CartModal open={cartModalOpen} onClose={handleCloseCartModal} cartItems={cartItems} />
        </AppBar>
    );
};

export default Navbar;
