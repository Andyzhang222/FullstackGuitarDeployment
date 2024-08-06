import React from 'react';
import { Box, Typography } from '@mui/material';

const services = [
  {
    title: 'Free and Insured Shipping',
    description: 'Enjoy peace of mind with free or insured shipping.',
    image: '/images/ServiesImages/circle1.svg',
  },
  {
    title: 'Expert Customer Service',
    description: 'Friendly support from our dedicated team.',
    image: '/images/ServiesImages/circle2.svg',
  },
  {
    title: 'In-Store Pick Up',
    description: 'Convenient pick-up at our store locations.',
    image: '/images/ServiesImages/circle3.svg',
  },
  {
    title: 'Pro Selection on Each Guitar',
    description: 'Carefully reviewed to ensure top quality.',
    image: '/images/ServiesImages/circle4.svg',
  },
];

const ServicesComponent: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '80px 72px',
        padding: '20px 0px',
        height: '271px',
      }}
    >
      {services.map((service, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '24%',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: '178px',
              marginBottom: '26px',
              marginTop: '0px',
            }}
          >
            <img
              src={service.image}
              alt={service.title}
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {service.title}
          </Typography>
          {service.description && (
            <Typography variant="body2" color="textSecondary">
              {service.description}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ServicesComponent;
