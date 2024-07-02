import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import homepageGuitar from '../image/homepageGuitar.jpg'; 

const closeModal = () => {
  console.log('Modal closed');
};

const MainPage: React.FC = () => {
  const location = useLocation();

  return (
    <Box
      sx={{ 
        display: 'flex', 
        height: '100vh', 
        width: '100vw', 
        padding: 0,
        margin: 0,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0' 
      }}
    >
      <Box
        sx={{
          flex: '1 1 50%', 
          backgroundImage: `url(${homepageGuitar})`,
          backgroundSize: 'cover', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center', 
          height: '100%',
        }}
      />
      <Box
        sx={{
          flex: '1 1 50%', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          height: '100%',
          paddingLeft: '50px', 
        }}
      >
        {location.pathname === '/register' ? <RegisterForm /> : <LoginForm closeModal={closeModal} />}
      </Box>
    </Box>
  );
};

export default MainPage;