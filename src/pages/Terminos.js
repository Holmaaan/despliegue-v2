import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';

const TermsOfServicePage = () => {
    return (
        <Container maxWidth="lg" sx={{ padding: '40px 20px' }}>
            {/* Título principal */}
            <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
                <Typography variant="h3" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#333' }}>
                    Términos de Servicio
                </Typography>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', marginTop: '10px', color: '#555' }}>
                    Última actualización: 25 de noviembre de 2024
                </Typography>
            </Box>

            {/* Sección de Introducción */}
            <Box sx={{ marginBottom: '40px' }}>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontFamily: 'Roboto, sans-serif', color: '#333' }}>
                    Bienvenido a nuestra tienda en línea. Estos términos de servicio rigen el uso de nuestro sitio web y
                    servicios. Al acceder o utilizar nuestra plataforma, aceptas estos términos en su totalidad.
                </Typography>
            </Box>

            {/* Sección de Uso del Sitio */}
            <Box sx={{ marginBottom: '40px' }}>
                <Typography variant="h5" sx={{ fontFamily: 'Roboto, sans-serif', color: '#333', fontWeight: 'bold' }}>
                    Uso del Sitio
                </Typography>
                <Divider sx={{ margin: '10px 0', backgroundColor: '#333' }} />
                <Typography variant="body1" sx={{ marginTop: '10px', lineHeight: 1.8, fontFamily: 'Roboto, sans-serif', color: '#555' }}>
                    Al utilizar nuestro sitio, te comprometes a no realizar ninguna actividad que pueda dañar el
                    funcionamiento o la seguridad del mismo. También aceptas no utilizar el sitio para fines ilegales o
                    inapropiados.
                </Typography>
            </Box>

            {/* Sección de Propiedad Intelectual */}
            <Box sx={{ marginBottom: '40px' }}>
                <Typography variant="h5" sx={{ fontFamily: 'Roboto, sans-serif', color: '#333', fontWeight: 'bold' }}>
                    Propiedad Intelectual
                </Typography>
                <Divider sx={{ margin: '10px 0', backgroundColor: '#333' }} />
                <Typography variant="body1" sx={{ marginTop: '10px', lineHeight: 1.8, fontFamily: 'Roboto, sans-serif', color: '#555' }}>
                    Todos los contenidos de este sitio, incluidos textos, imágenes, logotipos y gráficos, son propiedad de
                    nuestra tienda y están protegidos por las leyes de propiedad intelectual.
                </Typography>
            </Box>

            {/* Sección de Política de Privacidad */}
            <Box sx={{ marginBottom: '40px' }}>
                <Typography variant="h5" sx={{ fontFamily: 'Roboto, sans-serif', color: '#333', fontWeight: 'bold' }}>
                    Política de Privacidad
                </Typography>
                <Divider sx={{ margin: '10px 0', backgroundColor: '#333' }} />
                <Typography variant="body1" sx={{ marginTop: '10px', lineHeight: 1.8, fontFamily: 'Roboto, sans-serif', color: '#555' }}>
                    Tu privacidad es importante para nosotros. En nuestra Política de Privacidad te explicamos cómo
                    recopilamos, usamos y protegemos tu información personal.
                </Typography>
            </Box>

            {/* Sección de Cambios en los Términos */}
            <Box sx={{ marginBottom: '40px' }}>
                <Typography variant="h5" sx={{ fontFamily: 'Roboto, sans-serif', color: '#333', fontWeight: 'bold' }}>
                    Cambios en los Términos
                </Typography>
                <Divider sx={{ margin: '10px 0', backgroundColor: '#333' }} />
                <Typography variant="body1" sx={{ marginTop: '10px', lineHeight: 1.8, fontFamily: 'Roboto, sans-serif', color: '#555' }}>
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. Te recomendamos que
                    revises esta página periódicamente para estar al tanto de los cambios.
                </Typography>
            </Box>

            {/* Sección de Contacto */}
            <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontFamily: 'Roboto, sans-serif', color: '#333' }}>
                    Si tienes alguna pregunta sobre estos términos, no dudes en contactarnos a través de nuestra
                    página de contacto.
                </Typography>
            </Box>
        </Container>
    );
};

export default TermsOfServicePage