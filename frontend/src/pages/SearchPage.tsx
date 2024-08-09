import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header/Header';
import GlobalHeader from '../components/Header/GlobalHeader';
import Footer from '../components/Footer/Footer';
import ProductList from '../components/productListDisplay/ProductList';

const SearchPage = () => {
  return (
    <Box>
      <Header />
      <GlobalHeader />
      <ProductList />

      <Footer />
    </Box>
  );
};

export default SearchPage;
