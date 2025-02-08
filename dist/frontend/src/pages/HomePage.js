"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const Header_1 = tslib_1.__importDefault(require("../components/Header/Header"));
const GlobalHeader_1 = tslib_1.__importDefault(require("../components/Header/GlobalHeader"));
const Footer_1 = tslib_1.__importDefault(require("../components/Footer/Footer"));
// import ProductList from '../components/productListDisplay/ProductList';
const MarketingBanner_1 = tslib_1.__importDefault(require("../components/MarketingBanner/MarketingBanner"));
const FeaturedProductDisplay_1 = tslib_1.__importDefault(require("../components/HomepageProductSuggestion/FeaturedProductDisplay"));
const NewArrivalsProductDisplay_1 = tslib_1.__importDefault(require("../components/HomepageProductSuggestion/NewArrivalsProductDisplay"));
const ServicesComponent_1 = tslib_1.__importDefault(require("../components/HomePageComponents/ServicesComponent"));
const BrowseByCategory_1 = tslib_1.__importDefault(require("../components/HomePageComponents/BrowseByCategory"));
const Home = () => {
    return (<material_1.Box sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
      {' '}
      <Header_1.default />
      <GlobalHeader_1.default />
      <MarketingBanner_1.default />
      <FeaturedProductDisplay_1.default />
      <NewArrivalsProductDisplay_1.default />
      <ServicesComponent_1.default />
      <BrowseByCategory_1.default />
      <Footer_1.default />
    </material_1.Box>);
};
exports.default = Home;
//# sourceMappingURL=HomePage.js.map