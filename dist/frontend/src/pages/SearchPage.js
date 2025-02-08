"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const Header_1 = tslib_1.__importDefault(require("../components/Header/Header"));
const GlobalHeader_1 = tslib_1.__importDefault(require("../components/Header/GlobalHeader"));
const Footer_1 = tslib_1.__importDefault(require("../components/Footer/Footer"));
const ProductList_1 = tslib_1.__importDefault(require("../components/productSearchComponents/ProductList"));
const react_router_dom_1 = require("react-router-dom");
const BackButton_1 = tslib_1.__importDefault(require("../components/BackButton")); // 导入 Breadcrumbs 组件
const SearchPage = () => {
    const location = (0, react_router_dom_1.useLocation)();
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get('query') || ''; // 获取 query 参数
    return (<material_1.Box>
      <Header_1.default />
      <GlobalHeader_1.default />
      <BackButton_1.default category="Searching Page"/>{' '}
      {/* 传递 'Searching Page' 作为类别 */}
      {/* 将 searchTerm 传递给 SearchBar */}
      <ProductList_1.default searchTerm={searchTerm}/>
      <BackButton_1.default category="Searching Page"/> <Footer_1.default />
    </material_1.Box>);
};
exports.default = SearchPage;
//# sourceMappingURL=SearchPage.js.map