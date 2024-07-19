import React from 'react';
import { Button, Container, Typography, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken');

  const handleLogout = () => {
    // 移除 tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    // 更新页面状态
    navigate('/');
  };

  return (
    <div>
      <Header />
      <Container className={classes.content}>
        <Typography variant="h4" gutterBottom>
          {isAuthenticated
            ? 'Welcome to the Home Page'
            : 'Welcome to our Home Page, Guest'}
        </Typography>
        {isAuthenticated && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            className={classes.button}
          >
            Logout
          </Button>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
