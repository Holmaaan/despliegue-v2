// src/components/AuthModal.js

import React, { useState } from 'react';
import { Modal, Box, Tabs, Tab } from '@mui/material';
import LoginForm from './LoginForm'; // Importa el formulario de login
import RegisterForm from './RegisterForm'; // Importa el formulario de registro
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ open, onClose, setUserRole }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const { login } = useAuth(); // Accede al contexto de autenticación

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Modal
            open={open}
            onClose={onClose} // Asegúrate de pasar el prop onClose aquí
            aria-labelledby="auth-modal-title"
            aria-describedby="auth-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Iniciar Sesión" />
                    <Tab label="Registro" />
                </Tabs>
                {tabIndex === 0 && <LoginForm setUserRole={setUserRole} onClose={onClose} />}
                {tabIndex === 1 && <RegisterForm onClose={onClose} />}
            </Box>
        </Modal>
    );
};

export default AuthModal;
