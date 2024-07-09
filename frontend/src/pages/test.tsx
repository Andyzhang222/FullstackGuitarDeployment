import React, { useState } from 'react';
import { Container } from '@mui/material';
import SignInForm from '../components/Auth/SignInForm';
import SignUpForm from '../components/Auth/SignInForm';

const TestPage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleSwitch = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      {showSignIn ? (
        <SignInForm onSwitch={handleSwitch} />
      ) : (
        <SignUpForm onSwitch={handleSwitch} />
      )}
    </Container>
  );
};

export default TestPage;
