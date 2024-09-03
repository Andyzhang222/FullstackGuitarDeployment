import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header/Header';
import GlobalHeader from '../components/Header/GlobalHeader';
import Footer from '../components/Footer/Footer';
import CheckoutPageComponent from '../components/CheckoutPageComponent/CheckoutPageComponent';

const CheckoutPage: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <Header />
      <GlobalHeader />
      <Box sx={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <CheckoutPageComponent />
      </Box>
      <Footer />
    </Box>
  );
};

export default CheckoutPage;
