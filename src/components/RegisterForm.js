import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('cliente'); // Valor predeterminado

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, password, role });

            // Mostrar SweetAlert2 para registro exitoso
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: response.data.message,
                confirmButtonText: 'Aceptar',
            }).then(() => {
                // Limpiar los campos del formulario después del registro exitoso
                setUsername('');
                setPassword('');
                setRole('cliente'); // Resetear el valor del rol a 'cliente'
            });
        } catch (error) {
            if (error.response) {
                // Error con respuesta del servidor
                Swal.fire({
                    icon: 'error',
                    title: '¡Error al registrarse!',
                    text: error.response.data.message,
                    confirmButtonText: 'Intentar nuevamente',
                });
            } else if (error.request) {
                // La solicitud se realizó pero no hubo respuesta
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'No se recibió respuesta del servidor.',
                    confirmButtonText: 'Intentar nuevamente',
                });
            } else {
                // Otro tipo de error
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: error.message,
                    confirmButtonText: 'Intentar nuevamente',
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <TextField 
                label="Rol" 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                fullWidth 
                select
                margin="normal"
            >
                <MenuItem value="cliente">Cliente</MenuItem>
                <MenuItem value="employee">Empleado</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Registrarse
            </Button>
        </form>
    );
};

export default RegisterForm;
