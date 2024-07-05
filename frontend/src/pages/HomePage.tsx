import React from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 移除 tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    // 跳转到登录页面
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
