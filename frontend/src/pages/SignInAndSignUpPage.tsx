import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import signupPicture from '../assets/images/signinupPicture.jpg';
import SignUpForm from '../components/Auth/SignUpForm';
import SignInForm from '../components/Auth/SignInForm';
import './SignInAndSignUpPage.css';

const SignInAndSignUpPage: React.FC = () => {
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
        {isSignIn ? (
          <>
            <SignInForm />
            <div className="link-container">
              <span>Don&apos;t have an account?</span>
              <Link to="#" onClick={toggleForm} className="link">
                Sign up
              </Link>
            </div>
          </>
        ) : (
          <>
            <SignUpForm onRegistrationSuccess={handleRegistrationSuccess} />
            <div className="link-container">
              <span>Already have an account?</span>
              <Link to="#" onClick={toggleForm} className="link">
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInAndSignUpPage;
