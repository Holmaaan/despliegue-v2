import React, { useState, useEffect } from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';

// Importa las imágenes desde la carpeta assets
import image1 from '../assets/Banner1.jpg'; // Asegúrate de que la ruta sea correcta
import image2 from '../assets/Banner2.jpg'; // Asegúrate de que la ruta sea correcta
import image3 from '../assets/History-Page-Main-Banner-min.jpg'; // Asegúrate de que la ruta sea correcta

const images = [
  {
    url: image1,
    title: 'Explora nuevas oportunidades',
  },
  {
    url: image2,
    title: 'Descubre nuevas ideas',
  },
  {
    url: image3,
    title: 'Aumenta tu creatividad',
  },
];

const CarouselContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000',
});

const CarouselImage = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'opacity 1s ease',
  opacity: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '3rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
  '&:first-of-type': {
    opacity: 1, // Asegura que la primera imagen sea visible al inicio
  },
});

const Title = styled(Typography)({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#fff',
  fontSize: '1.5rem',
  textAlign: 'center',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
});

const NavButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

const IndicatorContainer = styled(Box)({
  position: 'absolute',
  bottom: '10px',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

const Indicator = styled('div')(({ active }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: active ? '#fff' : '#888',
  margin: '0 5px',
  transition: 'background-color 0.3s ease',
}));

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <CarouselContainer>
      {images.map((image, index) => (
        <CarouselImage
          key={index}
          style={{
            backgroundImage: `url(${image.url})`, // Mueve la imagen al estilo aquí
            opacity: index === currentIndex ? 1 : 0,
          }}
        >
          <Title>{image.title}</Title>
        </CarouselImage>
      ))}
      <NavButton onClick={handlePrev} style={{ left: '10px' }}>
        <ArrowBackIos />
      </NavButton>
      <NavButton onClick={handleNext} style={{ right: '10px' }}>
        <ArrowForwardIos />
      </NavButton>
      <IndicatorContainer>
        {images.map((_, index) => (
          <Indicator key={index} active={index === currentIndex} />
        ))}
      </IndicatorContainer>
    </CarouselContainer>
  );
};

export default CarouselComponent;
