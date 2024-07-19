import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
}));

const Home = () => {
  const classes = useStyles();
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <div>
      <Header />
      <Container className={classes.content}>
        <Typography variant="h4" gutterBottom>
          {isAuthenticated
            ? 'Welcome to the Home Page'
            : 'Welcome to our Home Page, Guest'}
        </Typography>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
