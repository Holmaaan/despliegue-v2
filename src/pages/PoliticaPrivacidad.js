import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const PrivacyPolicyPage = () => {
    return (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '60px 20px', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#333', marginBottom: '40px' }}>
                Política de Privacidad
            </Typography>
            
            <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Grid item xs={12} md={12}>
                    <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', lineHeight: '1.8', color: '#555' }}>
                        En <strong>Siena Caps</strong>, nos comprometemos a proteger su privacidad. Esta política de privacidad explica cómo recopilamos, usamos y protegemos su información personal cuando utiliza nuestros servicios. 
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" sx={{ fontFamily: 'Roboto, sans-serif', color: '#333', marginTop: '40px', fontWeight: 'bold' }}>
                        1. Información que recopilamos
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', lineHeight: '1.8', color: '#555', marginTop: '10px' }}>
                        Recopilamos información personal como nombre, dirección de correo electrónico, dirección de envío, y detalles de pago cuando realiza una compra en nuestro sitio. También podemos recopilar información sobre su navegador, dispositivo y actividades en línea para mejorar su experiencia.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" sx={{ fontFamily: 'Roboto, sans-serif', color: '#333', marginTop: '40px', fontWeight: 'bold' }}>
                        2. Uso de la información
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', lineHeight: '1.8', color: '#555', marginTop: '10px' }}>
                        Utilizamos su información para procesar pedidos, gestionar su cuenta, y ofrecerle productos y servicios personalizados. También podemos enviarle comunicaciones de marketing relacionadas con nuestros productos, pero siempre puede optar por no recibir estas comunicaciones.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" sx={{ fontFamily: 'Roboto, sans-serif', color: '#333', marginTop: '40px', fontWeight: 'bold' }}>
                        3. Protección de la información
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', lineHeight: '1.8', color: '#555', marginTop: '10px' }}>
                        Tomamos medidas razonables para proteger su información personal. Sin embargo, no podemos garantizar la seguridad total de sus datos debido a la naturaleza de Internet.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" sx={{ fontFamily: 'Roboto, sans-serif', color: '#333', marginTop: '40px', fontWeight: 'bold' }}>
                        4. Cambios en esta política
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', lineHeight: '1.8', color: '#555', marginTop: '10px' }}>
                        Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio será publicado en esta página y, si es necesario, le notificaremos.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', lineHeight: '1.8', color: '#555', marginTop: '40px' }}>
                        Al utilizar nuestro sitio, usted acepta las condiciones de esta política de privacidad. Si tiene alguna pregunta sobre nuestra política de privacidad, no dude en contactarnos.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PrivacyPolicyPage;