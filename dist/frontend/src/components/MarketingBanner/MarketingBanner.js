"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const system_1 = require("@mui/system");
const react_router_dom_1 = require("react-router-dom");
const BannerContainer = (0, system_1.styled)('div')({
    width: '100%',
    height: '522px',
    overflow: 'hidden',
    position: 'relative',
    margin: '0 auto',
});
const SliderWrapper = (0, system_1.styled)('div')({
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
    height: '100%',
});
const Slide = (0, system_1.styled)('div')({
    minWidth: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#fff',
    position: 'relative',
});
const IndicatorContainer = (0, system_1.styled)('div')({
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
});
const Indicator = (0, system_1.styled)('img')({
    width: '12px',
    height: '12px',
});
const ShopNowButton = (0, system_1.styled)('button')({
    position: 'absolute',
    bottom: '20%',
    left: '10%',
    padding: '15px 30px',
    backgroundColor: 'black',
    color: 'white',
    width: '260px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '22px',
    cursor: 'pointer',
    zIndex: 1,
    '&:hover': {
        opacity: 0.8,
    },
});
const MarketingBanner = () => {
    const [currentSlide, setCurrentSlide] = (0, react_1.useState)(0);
    const sliderRef = (0, react_1.useRef)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const slides = [
        '/images/MarketingBanner/bannerImage1.png',
        '/images/MarketingBanner/bannerImage1.png',
        '/images/MarketingBanner/bannerImage1.png',
        '/images/MarketingBanner/bannerImage1.png',
    ];
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [slides.length]);
    (0, react_1.useEffect)(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }, [currentSlide]);
    return (<BannerContainer>
      <SliderWrapper ref={sliderRef}>
        {slides.map((slide, index) => (<Slide key={index} style={{ backgroundImage: `url(${slide})` }}>
            <ShopNowButton onClick={() => navigate('/search')}>
              Shop Now
            </ShopNowButton>
          </Slide>))}
      </SliderWrapper>
      <IndicatorContainer>
        {slides.map((_, index) => (<Indicator key={index} src={index === currentSlide
                ? '/images/MarketingBanner/SlickActive.svg'
                : '/images/MarketingBanner/Slickinactive.svg'} alt={index === currentSlide ? 'Active Indicator' : 'Inactive Indicator'}/>))}
      </IndicatorContainer>
    </BannerContainer>);
};
exports.default = MarketingBanner;
//# sourceMappingURL=MarketingBanner.js.map