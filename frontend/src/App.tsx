import './middleware/axiosInterceptor'; // ✅ 确保 Axios 拦截器生效
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import SignInAndSignUpPage from './pages/SignInAndSignUpPage';
import ProductDetail from './pages/ProductDetailPage';
import SearchPage from './pages/SearchPage';
import ProductList from './components/productSearchComponents/ProductList';
import CheckoutPage from './pages/CheckoutPage'; // 导入CheckoutPage组件
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign" element={<SignInAndSignUpPage />} />
          <Route path="/products" element={<ProductList searchTerm="" />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
