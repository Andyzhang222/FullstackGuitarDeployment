import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const LoginSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      navigate('/'); 
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login Successful
        </Typography>
        <Typography variant="body1">
          Welcome! You have successfully logged in.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleLogout}
          sx={{ mt: 3 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default LoginSuccess;