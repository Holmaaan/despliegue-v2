import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const AboutPage = () => {
    return (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '60px 20px', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#333', marginBottom: '40px' }}>
                Acerca de Nosotros
            </Typography>
            
            <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', lineHeight: '1.8', color: '#555' }}>
                        Bienvenidos a nuestra tienda de gorras en línea. Ofrecemos una amplia selección de gorras de alta calidad diseñadas para todos los estilos. Desde gorras deportivas hasta estilos de moda, nos esforzamos en ofrecer productos cómodos y accesibles.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontFamily: 'Roboto, sans-serif', fontSize: '18px', lineHeight: '1.8', color: '#555' }}>
                        Nos enorgullece ofrecer un servicio al cliente excepcional y garantizar que cada uno de nuestros productos cumpla con los más altos estándares de calidad. Estamos comprometidos a proporcionar una experiencia de compra sencilla y eficaz para todos nuestros clientes.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AboutPage;