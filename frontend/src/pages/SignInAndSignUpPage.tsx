import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link, Container } from '@mui/material';
import signupPicture from '../assets/images/signinupPicture.jpg';
import SignUpForm from '../components/Auth/SignUpForm';
import SignInForm from '../components/Auth/SignInForm';

const SignInAndSignUpPage: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleRegistrationSuccess = () => {
    setIsSignIn(true); // 切换到登录表单
  };

  return (
    <Box display="flex" height="100vh">
      <Box
        sx={{
          width: '40%', // 固定宽度为45%
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
          borderRadius: '8px',
          height: '100%', // 确保高度一致
        }}
      >
        <Container maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              my: 12,
              justifyContent: 'flex-start', // 修复错误
            }}
          >
            {isSignIn ? (
              <>
                <SignInForm />
                <Box mt={2} sx={{ width: '100%' }}>
                  <Typography variant="body2" color="textSecondary">
                    {"Don't have an account? "}
                    <Link
                      component={RouterLink}
                      to="#"
                      onClick={toggleForm}
                      variant="body2"
                      style={{ color: '#007BFF', textDecoration: 'none' }}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <SignUpForm onRegistrationSuccess={handleRegistrationSuccess} />
                <Box mt={2} sx={{ width: '100%' }}>
                  <Typography variant="body2" color="textSecondary">
                    {'Already have an account? '}
                    <Link
                      component={RouterLink}
                      to="#"
                      onClick={toggleForm}
                      variant="body2"
                      style={{ color: '#007BFF', textDecoration: 'none' }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SignInAndSignUpPage;
