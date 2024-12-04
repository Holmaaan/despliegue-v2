import React from 'react';
import { Box, Typography, Button, AppBar, Toolbar, Card, CardContent, Grid } from '@mui/material';
import { AccountCircle, ShoppingCart, LocalShipping } from '@mui/icons-material';
import Sidebar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';

const AdminPageMaterialUI = ({ logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <AppBar position="static" sx={{ mb: 4 }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Panel de Control del Administrador
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                    </Toolbar>
                </AppBar>
                <Typography variant="h4" gutterBottom>
                    Bienvenido al Panel de Control
                </Typography>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
                            <CardContent>
                                <AccountCircle sx={{ fontSize: 40, color: 'primary.main' }} />
                                <Typography variant="h5" sx={{ mt: 2 }}>
                                    Usuarios
                                </Typography>
                                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                    Gestionar
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
                            <CardContent>
                                <ShoppingCart sx={{ fontSize: 40, color: 'primary.main' }} />
                                <Typography variant="h5" sx={{ mt: 2 }}>
                                    Productos
                                </Typography>
                                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                    Gestionar
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
                            <CardContent>
                                <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />
                                <Typography variant="h5" sx={{ mt: 2 }}>
                                    Pedidos
                                </Typography>
                                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                    Gestionar
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AdminPageMaterialUI;
