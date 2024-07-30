import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Header from '../components/Header/Header';
import GlobalHeader from '../components/Header/GlobalHeader';
import Footer from '../components/Footer/Footer';
import ProductList from '../components/productListDisplay/ProductList';
import MarketingBanner from '../components/MarketingBanner/MarketingBanner';

const Home = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <Box>
      <Header />
      <GlobalHeader />
      <MarketingBanner />
      <Container sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          {isAuthenticated
            ? 'Welcome to the Home Page'
            : 'Welcome to our Home Page, Guest'}
        </Typography>
        <ProductList />
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;
