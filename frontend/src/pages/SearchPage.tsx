import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header/Header';
import GlobalHeader from '../components/Header/GlobalHeader';
import Footer from '../components/Footer/Footer';
import ProductList from '../components/productListDisplay/ProductList';
import SearchBar from '../components/Header/SearchBar';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchTerm = params.get('query') || ''; // 获取 query 参数

  return (
    <Box>
      <Header />
      <GlobalHeader />
      <SearchBar searchTerm={searchTerm} />{' '}
      {/* 将 searchTerm 传递给 SearchBar */}
      <ProductList searchTerm={searchTerm} />
      <Footer />
    </Box>
  );
};

export default SearchPage;
