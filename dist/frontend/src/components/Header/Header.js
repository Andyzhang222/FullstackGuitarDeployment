"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const AppBar_1 = tslib_1.__importDefault(require("@mui/material/AppBar"));
const Toolbar_1 = tslib_1.__importDefault(require("@mui/material/Toolbar"));
const Menu_1 = tslib_1.__importDefault(require("@mui/material/Menu"));
const MenuItem_1 = tslib_1.__importDefault(require("@mui/material/MenuItem"));
const IconButton_1 = tslib_1.__importDefault(require("@mui/material/IconButton"));
const react_router_dom_1 = require("react-router-dom");
const system_1 = require("@mui/system");
const jwt_decode_1 = require("jwt-decode"); // 使用命名导入
const theme_1 = tslib_1.__importDefault(require("../../theme/theme"));
const customStyles_1 = require("../../theme/customStyles");
const SearchBar_1 = tslib_1.__importDefault(require("./SearchBar"));
const CartDrawer_1 = tslib_1.__importDefault(require("../Cart/CartDrawer"));
const react_redux_1 = require("react-redux");
const cartSlice_1 = require("../../components/store/cartSlice");
const PageHeader = (0, system_1.styled)(AppBar_1.default)({
    backgroundColor: '#02000C',
    width: '100%',
    padding: '16px, 72px, 16px, 72px',
    maxHeight: '72px',
    boxSizing: 'border-box',
    color: theme_1.default.palette.common.black,
});
const LayoutBlocks = (0, system_1.styled)('div')({
    width: '1300px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 auto',
});
const SignInContainer = (0, system_1.styled)('div')({
    display: 'flex',
    alignItems: 'center',
    width: '103px',
    height: '32px',
    gap: '8px',
    cursor: 'pointer',
});
const CartContainer = (0, system_1.styled)('div')({
    width: '87px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'flex-end',
    cursor: 'pointer',
});
const Header = () => {
    const dispatch = (0, react_redux_1.useDispatch)(); // 使用 AppDispatch 类型
    const navigate = (0, react_router_dom_1.useNavigate)(); // 使用 navigate 进行导航
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    const [userEmail, setUserEmail] = (0, react_1.useState)('');
    const [cartOpen, setCartOpen] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const idToken = localStorage.getItem('idToken');
        if (idToken) {
            try {
                const decoded = (0, jwt_decode_1.jwtDecode)(idToken);
                setUserEmail(decoded.email);
                setIsLoggedIn(true);
            }
            catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, []);
    const toggleCartDrawer = (open) => () => {
        if (open) {
            const authToken = localStorage.getItem('accessToken');
            if (authToken) {
                console.log('Sending token to backend:', authToken);
                dispatch((0, cartSlice_1.fetchCartItems)()); // 直接发请求到后端，后端处理token
            }
            else {
                console.error('Token not found in localStorage');
            }
        }
        setCartOpen(open);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('cartItems'); // 清除购物车数据
        window.location.reload();
        setIsLoggedIn(false);
        setUserEmail('');
        handleClose();
    };
    const handleLogoClick = () => {
        navigate('/'); // 导航到主页
    };
    return (<PageHeader position="static">
      <Toolbar_1.default>
        <LayoutBlocks>
          <customStyles_1.LogoName onClick={handleLogoClick} sx={{ cursor: 'pointer' }}>
            Logo
          </customStyles_1.LogoName>
          <SearchBar_1.default />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (<>
                <SignInContainer>
                  <IconButton_1.default edge="end" aria-label="current user account" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                    <img src="/images/Header/User.svg" alt="User Icon"/>
                    <customStyles_1.BodyText> Profile</customStyles_1.BodyText>
                  </IconButton_1.default>
                  <Menu_1.default id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} keepMounted transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem_1.default disabled>{userEmail}</MenuItem_1.default>
                    <MenuItem_1.default onClick={() => navigate('/profile')}>
                      Profile
                    </MenuItem_1.default>
                    <MenuItem_1.default onClick={handleLogout}>Logout</MenuItem_1.default>
                  </Menu_1.default>
                </SignInContainer>
              </>) : (<SignInContainer onClick={() => navigate('/sign')}>
                <img src="/images/Header/User.svg" alt="User Icon"/>
                <customStyles_1.BodyText>Sign in</customStyles_1.BodyText>
              </SignInContainer>)}
            <CartContainer onClick={toggleCartDrawer(true)}>
              <img src="/images/Header/ShoppingCart.svg" alt="Cart Icon"/>
              <customStyles_1.BodyText>Cart</customStyles_1.BodyText>
            </CartContainer>
          </div>
        </LayoutBlocks>
      </Toolbar_1.default>
      <CartDrawer_1.default open={cartOpen} onClose={toggleCartDrawer(false)}/>
    </PageHeader>);
};
exports.default = Header;
//# sourceMappingURL=Header.js.map