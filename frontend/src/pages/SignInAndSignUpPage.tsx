import React, { useState } from 'react';
import SignInForm from '../components/Auth/SignInForm';
import SignUpForm from '../components/Auth/SignUpForm';
import { Button } from '@material-ui/core';
import './SignInAndSignUpPage.css';
import signinupPicture from '../assets/images/signinupPicture.jpg';

const SignInAndSignUpPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src={signinupPicture} alt="Sign in and Sign up" />
      </div>
      <div className="form-section">
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
            <SignUpForm />
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
