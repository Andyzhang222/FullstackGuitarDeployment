"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const cartSlice_1 = require("../../components/store/cartSlice");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = tslib_1.__importDefault(require("axios"));
const ProductActions = ({ productId, setShowCart, }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [open, setOpen] = (0, react_1.useState)(false);
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(null);
    const handleAddToCart = async () => {
        var _a;
        setErrorMessage(null); // 清除之前的错误消息
        const idToken = localStorage.getItem('idToken');
        if (!idToken) {
            setOpen(true); // 未登录时弹出登录对话框
            return;
        }
        if (productId) {
            try {
                console.log('Sending request to add item to cart:', {
                    productId,
                    quantity: 1,
                });
                await dispatch((0, cartSlice_1.addToCart)({ productId, quantity: 1 })).unwrap();
                console.log('Item successfully added to cart.');
                dispatch((0, cartSlice_1.fetchCartItems)()); // 更新购物车数据
                setShowCart(true); // 展示购物车抽屉
            }
            catch (error) {
                // 打印出完整的错误对象，帮助调试
                console.error('Caught error:', error);
                if (axios_1.default.isAxiosError(error)) {
                    const errorData = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
                    // 打印出 errorData，帮助确认数据结构
                    console.log('Error data:', errorData);
                    // 处理库存不足的情况
                    if ((errorData === null || errorData === void 0 ? void 0 : errorData.error) === 'Insufficient stock' &&
                        (errorData === null || errorData === void 0 ? void 0 : errorData.availableQuantity)) {
                        // 这里直接提示库存不足的消息
                        setErrorMessage(`库存不足！当前仅剩 ${errorData.availableQuantity} 件商品。`);
                    }
                    else if (error.response) {
                        // 其他类型的错误处理
                        setErrorMessage(`Error: ${error.response.status} - ${error.response.statusText}`);
                    }
                    else {
                        setErrorMessage('Failed to add item to cart');
                    }
                }
                else {
                    console.error('Non-Axios error:', error);
                    setErrorMessage('Insufficient stock, failed to add to cart.');
                }
            }
        }
        else {
            console.error('Product ID is undefined');
        }
    };
    const handleBuyItNow = async () => {
        await handleAddToCart(); // 先将商品添加到购物车
        setShowCart(true); // 然后显示购物车抽屉
    };
    const handleDialogClose = () => {
        setOpen(false);
    };
    const handleLoginRedirect = () => {
        handleDialogClose();
        navigate('/sign');
    };
    return (<material_1.Box>
      <material_1.Button variant="contained" sx={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            width: '100%',
            height: '48px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontWeight: 'bold',
            fontSize: '16px',
        }} onClick={handleBuyItNow}>
        Buy It Now
      </material_1.Button>
      <material_1.Button variant="outlined" sx={{
            borderColor: '#000000',
            color: '#000000',
            width: '100%',
            height: '48px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontWeight: 'bold',
            fontSize: '16px',
        }} onClick={handleAddToCart}>
        Add to Cart
      </material_1.Button>

      {errorMessage && (<material_1.Alert severity="error" sx={{ marginTop: '16px' }}>
          {errorMessage}
        </material_1.Alert>)}

      <material_1.Dialog open={open} onClose={handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <material_1.DialogTitle id="alert-dialog-title">{'Please log in'}</material_1.DialogTitle>
        <material_1.DialogContent>
          <material_1.DialogContentText id="alert-dialog-description">
            You need to log in to add items to your cart.
          </material_1.DialogContentText>
        </material_1.DialogContent>
        <material_1.DialogActions>
          <material_1.Button onClick={handleDialogClose} color="primary">
            Cancel
          </material_1.Button>
          <material_1.Button onClick={handleLoginRedirect} color="primary" autoFocus>
            Log in
          </material_1.Button>
        </material_1.DialogActions>
      </material_1.Dialog>
    </material_1.Box>);
};
exports.default = ProductActions;
//# sourceMappingURL=ProductActions.js.map