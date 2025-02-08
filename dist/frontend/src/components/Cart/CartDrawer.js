"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const material_1 = require("@mui/material");
const Close_1 = tslib_1.__importDefault(require("@mui/icons-material/Close"));
const cartSlice_1 = require("../../components/store/cartSlice");
const CartItemCard_1 = tslib_1.__importDefault(require("./CartItemCard"));
const react_router_dom_1 = require("react-router-dom"); // 导入useNavigate
const CartDrawer = ({ open, onClose }) => {
    const items = (0, react_redux_1.useSelector)(cartSlice_1.selectCartItems);
    const outOfStockItems = (0, react_redux_1.useSelector)(cartSlice_1.selectOutOfStockItems); // 获取库存不足的商品
    const navigate = (0, react_router_dom_1.useNavigate)(); // 使用useNavigate来导航到新页面
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    const tax = subtotal * 0.15; // 15% 税
    const shipping = 0; // 临时运费
    const total = subtotal + tax + shipping;
    // 当库存不足时禁用结账按钮
    const isCheckoutDisabled = outOfStockItems.length > 0;
    const handleCheckout = () => {
        if (!isCheckoutDisabled) {
            navigate('/checkout'); // 点击Checkout按钮后导航到Checkout页面
        }
    };
    return (<material_1.Drawer anchor="right" open={open} onClose={onClose}>
      <material_1.Box sx={{
            width: 400,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}>
        <material_1.Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
        }}>
          <material_1.Typography variant="h6">Shopping Cart</material_1.Typography>
          <material_1.IconButton onClick={onClose}>
            <Close_1.default />
          </material_1.IconButton>
        </material_1.Box>
        <material_1.Divider />
        <material_1.Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2 }}>
          {items.length > 0 ? (items.map((item) => (<CartItemCard_1.default key={item.productId} productId={item.productId} name={item.name} image={item.image} price={item.price} quantity={item.quantity}/>))) : (<material_1.Typography>Your cart is currently empty.</material_1.Typography>)}
        </material_1.Box>
        <material_1.Divider />
        <material_1.Box sx={{ mt: 2 }}>
          <material_1.Typography variant="h6">Order Summary</material_1.Typography>
          <material_1.Box sx={{ mb: 2 }}>
            <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <material_1.Typography>Subtotal</material_1.Typography>
              <material_1.Typography>${subtotal.toFixed(2)}</material_1.Typography>
            </material_1.Box>
            <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <material_1.Typography>Estimated Shipping</material_1.Typography>
              <material_1.Typography>$0.00</material_1.Typography>
            </material_1.Box>
            <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <material_1.Typography>Estimated Tax (15%)</material_1.Typography>
              <material_1.Typography>${tax.toFixed(2)}</material_1.Typography>
            </material_1.Box>
          </material_1.Box>
          <material_1.Divider />
          <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <material_1.Typography variant="h6">Total</material_1.Typography>
            <material_1.Typography variant="h6">${total.toFixed(2)}</material_1.Typography>
          </material_1.Box>
          <material_1.Box sx={{ mt: 2 }}>
            <material_1.Button variant="contained" color="primary" fullWidth sx={{
            backgroundColor: isCheckoutDisabled ? '#aaaaaa' : '#000000', // 当禁用时，按钮颜色变灰
            '&:hover': {
                backgroundColor: isCheckoutDisabled ? '#aaaaaa' : '#333333',
            },
        }} onClick={handleCheckout} disabled={isCheckoutDisabled} // 如果有库存不足的商品，则禁用按钮
    >
              Checkout
            </material_1.Button>
            {/* 显示库存不足的警告 */}
            {isCheckoutDisabled && (<material_1.Typography color="error" sx={{ mt: 2 }}>
                You have items that are out of stock. Please adjust quantities
                before checking out.
              </material_1.Typography>)}
          </material_1.Box>
        </material_1.Box>
      </material_1.Box>
    </material_1.Drawer>);
};
exports.default = CartDrawer;
//# sourceMappingURL=CartDrawer.js.map