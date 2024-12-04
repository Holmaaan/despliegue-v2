import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const LoginForm = ({ setUserRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            
            // Mostrar la alerta de éxito con SweetAlert
            Swal.fire({
                icon: 'success',
                title: '¡Login exitoso!',
                text: 'Bienvenido a tu panel.',
                confirmButtonText: 'Aceptar',
            }).then(() => {
                setUserRole(response.data.role);

                // Redirigir según el rol del usuario
                if (response.data.role === 'admin') {
                    navigate('/admin');
                } else if (response.data.role === 'employee') {
                    navigate('/employee');
                } else {
                    navigate('/'); // Si el rol es cliente
                }
            });
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error al iniciar sesión. Intenta de nuevo.';
            setErrorMessage(errorMsg);

            // Mostrar alerta de error con SweetAlert
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: errorMsg,
                confirmButtonText: 'Intentar nuevamente',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>
                Iniciar Sesión
            </Typography>
            {errorMessage && (
                <Typography color="error" variant="body2" gutterBottom>
                    {errorMessage}
                </Typography>
            )}
            <TextField
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Iniciar Sesión
            </Button>
        </form>
    );
};

export default LoginForm;
