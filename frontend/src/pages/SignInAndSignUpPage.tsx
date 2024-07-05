import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import signupPicture from '../assets/images/signinupPicture.jpg';
import SignUpForm from '../components/Auth/SignUpForm';
import SignInForm from '../components/Auth/SignInForm';
import './SignInAndSignUpPage.css';

const SignInAndSignUpPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleRegistrationSuccess = () => {
    setIsSignIn(true); // 切换到登录表单
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src={signupPicture} alt="Sign in and Sign up" />
      </div>
      <div className="form-section">
        <h1>Welcome to Fantasy</h1>
        <h2>Welcome Back! Please enter your details.</h2>
        {isSignIn ? (
          <>
            <SignInForm />
            <p>
              Don&apos;t have an account?{' '}
              <Button color="primary" onClick={toggleForm}>
                Sign up
              </Button>
            </p>
          </>
        ) : (
          <>
            <SignUpForm onRegistrationSuccess={handleRegistrationSuccess} />
            <p>
              Already have an account?{' '}
              <Button color="primary" onClick={toggleForm}>
                Sign in
              </Button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInAndSignUpPage;
