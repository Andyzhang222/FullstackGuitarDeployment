"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const material_1 = require("@mui/material");
const ArrowBackIos_1 = tslib_1.__importDefault(require("@mui/icons-material/ArrowBackIos"));
const ArrowForwardIos_1 = tslib_1.__importDefault(require("@mui/icons-material/ArrowForwardIos"));
const HomePageProductCard_1 = tslib_1.__importDefault(require("./HomePageProductCard"));
const customStyles_1 = require("../../theme/customStyles");
const react_router_dom_1 = require("react-router-dom");
const config_1 = tslib_1.__importDefault(require("../../config"));
const NewArrivalsProductDisplay = () => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [currentSlide, setCurrentSlide] = (0, react_1.useState)(0);
    const [error, setError] = (0, react_1.useState)(null);
    const maxVisibleSlides = 5;
    const sliderRef = (0, react_1.useRef)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${config_1.default}:5001/api/products?limit=10&sort=newest`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // 假设从后端获取的数据是按照创建日期排序的
            setProducts(data.products);
        }
        catch (err) {
            console.error('Error fetching products:', err);
            setError('can not load the product');
        }
    };
    const nextSlide = () => {
        setCurrentSlide((prev) => Math.min(prev + maxVisibleSlides, products.length - maxVisibleSlides));
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - maxVisibleSlides, 0));
    };
    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };
    return (<material_1.Box sx={{ width: '100%' }}>
      <material_1.Box 
    // maxWidth="lg"
    sx={{
            overflow: 'hidden',
            // border: '2px solid black',
            margin: '0 auto',
            width: '100%',
        }}>
        <material_1.Box sx={{
            textAlign: 'center',
            margin: '0 72px',
            height: '120px',
            // border: '2px solid yellow',
        }}>
          <customStyles_1.SectionHeader sx={{
            position: 'relative',
            top: '52px',
            left: '0',
            transform: 'translateX(0%)',
            // border: '1px solid yellow',
            width: '350px',
            Height: '40px',
        }}>
            New Arrivals{' '}
          </customStyles_1.SectionHeader>
        </material_1.Box>
        <material_1.Box sx={{
            position: 'relative',
            // border: '2px solid blue',
            overflow: 'hidden',
            margin: '0 72px',
        }}>
          {error && (<material_1.Typography color="error" sx={{ textAlign: 'center', marginTop: 2 }}>
              {error}
            </material_1.Typography>)}
          <material_1.IconButton onClick={prevSlide} sx={{
            position: 'absolute',
            top: '50%',
            left: '0',
            transform: 'translateY(-50%)',
            zIndex: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}>
            <ArrowBackIos_1.default />
          </material_1.IconButton>
          <material_1.Box ref={sliderRef} sx={{
            display: 'flex',
            transition: 'transform 0.5s ease-in-out',
            transform: `translateX(-${currentSlide * (240 + 24)}px)`,
            // border: '2px solid pink',
            width: 'calc(100% - 144px)', // Adjust to account for the margin
        }}>
            {products.map((product) => (<material_1.Box key={product.id} sx={{
                width: '240px',
                height: '336px',
                flexShrink: 0,
                marginRight: '16px',
                marginLeft: '16px',
                borderRadius: '8px',
                overflow: 'hidden',
            }}>
                <HomePageProductCard_1.default product={product} onClick={() => handleProductClick(product.id)}/>
              </material_1.Box>))}
          </material_1.Box>
          <material_1.IconButton onClick={nextSlide} sx={{
            position: 'absolute',
            top: '50%',
            right: '0',
            transform: 'translateY(-50%)',
            zIndex: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}>
            <ArrowForwardIos_1.default />
          </material_1.IconButton>
        </material_1.Box>
      </material_1.Box>
    </material_1.Box>);
};
exports.default = NewArrivalsProductDisplay;
//# sourceMappingURL=NewArrivalsProductDisplay.js.map