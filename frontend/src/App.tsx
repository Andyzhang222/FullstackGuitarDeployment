import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInAndSignUpPage from './pages/SignInAndSignUpPage';
import Home from './pages/HomePage';
import PrivateRoute from './middleware/PrivateRoute';
import ProductList from './components/productListDisplay/ProductList';
import ProductDetail from './pages/ProductDetailPage'; // 导入产品详情页组件
import SearchPage from './pages/SearchPage'; // 导入你的 SearchPage 组件

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<SignInAndSignUpPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />{' '}
        <Route path="/search" element={<SearchPage />} /> {/* 搜索页面路由 */}
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
