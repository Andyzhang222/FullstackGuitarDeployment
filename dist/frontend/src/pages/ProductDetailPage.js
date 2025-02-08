"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Header_1 = tslib_1.__importDefault(require("../components/Header/Header"));
const GlobalHeader_1 = tslib_1.__importDefault(require("../components/Header/GlobalHeader"));
const Footer_1 = tslib_1.__importDefault(require("../components/Footer/Footer"));
const material_1 = require("@mui/material");
const ProductImages_1 = tslib_1.__importDefault(require("../components/ProductDetailComponents/ProductImages"));
const ProductDetails_1 = tslib_1.__importDefault(require("../components/ProductDetailComponents/ProductDetails"));
const ProductAdditionalDetails_1 = tslib_1.__importDefault(require("../components/ProductDetailComponents/ProductAdditionalDetails"));
const BackButton_1 = tslib_1.__importDefault(require("../components/BackButton"));
const NewArrivalsProductDisplay_1 = tslib_1.__importDefault(require("../components/HomepageProductSuggestion/NewArrivalsProductDisplay"));
const config_1 = tslib_1.__importDefault(require("../config"));
const ProductDetailPage = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const location = (0, react_router_dom_1.useLocation)();
    const { product: initialProduct } = location.state || {};
    const [product, setProduct] = (0, react_1.useState)(initialProduct || null);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (!product) {
            fetch(`${config_1.default}:5001/api/products/${id}`)
                .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
                .then((data) => {
                setProduct(data);
            })
                .catch((error) => {
                setError(`Failed to fetch product: ${error.message}`);
            });
        }
    }, [id, product]);
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!product) {
        return <div>Loading...</div>;
    }
    return (<>
      <Header_1.default />
      <GlobalHeader_1.default />
      <material_1.Container maxWidth={false} sx={{ width: '100%' }}>
        <BackButton_1.default category={product.category}/>
        <material_1.Card sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 2,
            boxShadow: 'none',
        }}>
          <material_1.Box sx={{ display: 'flex' }}>
            <ProductImages_1.default image={product.image} alt={product.name}/>
            <ProductDetails_1.default name={product.name} description={product.description} price={product.price} brand={product.brand} category={product.category} quantity={product.quantity} inStock={product.inStock} image={product.image.startsWith('/')
            ? product.image
            : `/${product.image}`}/>
          </material_1.Box>
        </material_1.Card>
        <ProductAdditionalDetails_1.default />
        <NewArrivalsProductDisplay_1.default />
        <BackButton_1.default category={product.category}/>
      </material_1.Container>
      <Footer_1.default />
    </>);
};
exports.default = ProductDetailPage;
//# sourceMappingURL=ProductDetailPage.js.map