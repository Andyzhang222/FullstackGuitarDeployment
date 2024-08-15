import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import signupPicture from '../assets/images/signinupPicture.jpg';
import SignUpForm from '../components/Auth/SignUpForm';
import SignInForm from '../components/Auth/SignInForm';
import ForgotPasswordForm from '../components/Auth/ForgotPasswordForm'; // 添加这个导入

const SignInAndSignUpPage: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<
    'signIn' | 'signUp' | 'forgotPassword'
  >('signIn');

  const switchToSignUp = () => setCurrentForm('signUp');
  const switchToSignIn = () => setCurrentForm('signIn');
  const switchToForgotPassword = () => setCurrentForm('forgotPassword');

  const handleRegistrationSuccess = () => {
    setCurrentForm('signIn');
  };

  return (
    <Box display="flex" height="100vh">
      <Box
        sx={{
          width: '42%', // 固定宽度为42%
          display: 'flex',
          justifyContent: 'flex-start', // 确保图片靠左对齐
          alignItems: 'center',
          overflow: 'hidden', // 防止图片溢出
        }}
      >
        <img
          src={signupPicture}
          alt="Sign Up"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1, // 占满剩余空间
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white', // 确保背景色一致
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', // 添加阴影效果
          padding: '32px',
          borderRadius: '8px',
        }}
      >
        <Container maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              my: 12,
            }}
          >
            {currentForm === 'signIn' && (
              <SignInForm
                onSwitch={switchToSignUp}
                onSwitchToForgotPassword={switchToForgotPassword}
              />
            )}
            {currentForm === 'signUp' && (
              <SignUpForm
                onSwitch={switchToSignIn}
                onRegistrationSuccess={handleRegistrationSuccess}
              />
            )}
            {currentForm === 'forgotPassword' && (
              <ForgotPasswordForm onSwitchToSignIn={switchToSignIn} />
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SignInAndSignUpPage;
