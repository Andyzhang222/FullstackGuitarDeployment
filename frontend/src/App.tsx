import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInAndSignUpPage from './pages/SignInAndSignUpPage';
import Home from './pages/HomePage';
import PrivateRoute from './middleware/PrivateRoute';
import ProductList from './components/productListDisplay/ProductList';
import ProductDetail from './pages/ProductDetailPage'; // 导入产品详情页组件

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInAndSignUpPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />{' '}
        {/* 产品详情页 */}
        {/* 其他需要认证的页面 */}
        <Route
          path="/private"
          element={
            <PrivateRoute>
              <Home /> {/* 示例组件 */}
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
