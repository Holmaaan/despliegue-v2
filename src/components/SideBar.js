import React from 'react';
import { Box, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Dashboard, Person, Store, ShoppingCart } from '@mui/icons-material';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: 250, bgcolor: '#000', height: '100vh', boxShadow: 3 }}>
            <List>
                {/* Dashboard */}
                <ListItem 
                    button 
                    onClick={() => navigate('/admin')}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hover effect
                        },
                        color: '#fff', // Texto blanco
                    }}
                >
                    <Dashboard sx={{ marginRight: 2 }} />
                    <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />
                </ListItem>

                {/* Usuarios */}
                <ListItem 
                    button 
                    onClick={() => navigate('/admin/users')}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hover effect
                        },
                        color: '#fff', // Texto blanco
                    }}
                >
                    <Person sx={{ marginRight: 2 }} />
                    <ListItemText primary="Usuarios" sx={{ color: '#fff' }} />
                </ListItem>

                {/* Productos */}
                <ListItem 
                    button 
                    onClick={() => navigate('/admin/products')}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hover effect
                        },
                        color: '#fff', // Texto blanco
                    }}
                >
                    <Store sx={{ marginRight: 2 }} />
                    <ListItemText primary="Productos" sx={{ color: '#fff' }} />
                </ListItem>

                {/* Pedidos */}
                <ListItem 
                    button 
                    onClick={() => navigate('/admin/orders')}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hover effect
                        },
                        color: '#fff', // Texto blanco
                    }}
                >
                    <ShoppingCart sx={{ marginRight: 2 }} />
                    <ListItemText primary="Pedidos" sx={{ color: '#fff' }} />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
