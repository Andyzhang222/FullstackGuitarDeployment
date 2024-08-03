import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header/Header';
import GlobalHeader from '../components/Header/GlobalHeader';
import Footer from '../components/Footer/Footer';
// import ProductList from '../components/productListDisplay/ProductList';
import MarketingBanner from '../components/MarketingBanner/MarketingBanner';
import FeaturedProductDisplay from '../components/HomepageProductSuggestion/FeaturedProductDisplay';
import NewArrivalsProductDisplay from '../components/HomepageProductSuggestion/NewArrivalsProductDisplay';
import ServicesComponent from '../components/HomePageComponents/ServicesComponent';
import BrowseByCategory from '../components/HomePageComponents/BrowseByCategory';

const Home = () => {
  return (
    <Box>
      <Header />
      <GlobalHeader />
      <MarketingBanner />
      <FeaturedProductDisplay />
      <NewArrivalsProductDisplay />
      <ServicesComponent />
      <BrowseByCategory />

      <Footer />
    </Box>
  );
};

export default Home;
