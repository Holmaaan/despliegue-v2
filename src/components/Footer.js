import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box 
            sx={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '20px',
                textAlign: 'center',
                marginTop: 'auto'
            }}
        >
            <Typography variant="body1">
                &copy; {new Date().getFullYear()} Siena Caps. Todos los derechos reservados.
            </Typography>
            <Typography variant="body2">
                <Link href="/privacy-policy" color="inherit" underline="hover">
                    Política de Privacidad
                </Link>{' '}
                |{' '}
                <Link href="/terms-of-service" color="inherit" underline="hover">
                    Términos de Servicio
                </Link>
            </Typography>
        </Box>
    );
};

export default Footer;
