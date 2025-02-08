"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const HomePage_1 = tslib_1.__importDefault(require("./pages/HomePage"));
const SignInAndSignUpPage_1 = tslib_1.__importDefault(require("./pages/SignInAndSignUpPage"));
const ProductDetailPage_1 = tslib_1.__importDefault(require("./pages/ProductDetailPage"));
const SearchPage_1 = tslib_1.__importDefault(require("./pages/SearchPage"));
const ProductList_1 = tslib_1.__importDefault(require("./components/productSearchComponents/ProductList"));
const CheckoutPage_1 = tslib_1.__importDefault(require("./pages/CheckoutPage")); // 导入CheckoutPage组件
const CartContext_1 = require("./context/CartContext");
const App = () => {
    return (<CartContext_1.CartProvider>
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<HomePage_1.default />}/>
          <react_router_dom_1.Route path="/sign" element={<SignInAndSignUpPage_1.default />}/>
          <react_router_dom_1.Route path="/products" element={<ProductList_1.default searchTerm=""/>}/>{' '}
          {/* 提供默认 searchTerm */}
          <react_router_dom_1.Route path="/products/:id" element={<ProductDetailPage_1.default />}/>
          <react_router_dom_1.Route path="/search" element={<SearchPage_1.default />}/>
          <react_router_dom_1.Route path="/checkout" element={<CheckoutPage_1.default />}/>{' '}
          {/* 添加Checkout页面路由 */}
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </CartContext_1.CartProvider>);
};
exports.default = App;
//# sourceMappingURL=App.js.map