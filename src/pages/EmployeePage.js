import React from 'react';
import { Box, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeePage = ({ logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Panel de Control del Empleado
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Bienvenido al Panel de Control del Empleado
                </Typography>
                <Button variant="contained" color="primary">
                    Ver Reportes
                </Button>
                {/* Aquí puedes agregar más componentes o secciones específicas para el empleado */}
            </Box>
        </Box>
    );
};

export default EmployeePage;
