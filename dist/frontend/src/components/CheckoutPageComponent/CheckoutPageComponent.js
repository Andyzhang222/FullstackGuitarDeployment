"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const cartSlice_1 = require("../../components/store/cartSlice");
const AddressSelection_1 = tslib_1.__importDefault(require("./AddressSelection")); // 引入 AddressSelection 组件
const CartItem_1 = tslib_1.__importDefault(require("./CartItem")); // 引入新的 CartItem 组件
const CheckoutPageComponent = () => {
    const items = (0, react_redux_1.useSelector)(cartSlice_1.selectCartItems);
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    const tax = subtotal * 0.15;
    const shipping = 30; // 示例运费
    const total = subtotal + tax + shipping;
    return (<material_1.Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: '72px', // 左右边距
            paddingRight: '72px',
        }}>
      <material_1.Box sx={{ width: '100%' }}>
        <material_1.Typography variant="h4" sx={{ mb: 3 }}>
          My Cart ({items.length})
        </material_1.Typography>
        <AddressSelection_1.default /> {/* 在此处使用 AddressSelection 组件 */}
        {items.map((item) => (<CartItem_1.default key={item.productId} item={item}/>))}
      </material_1.Box>

      <material_1.Box sx={{
            width: '420px', // 固定宽度
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            padding: '16px',
        }}>
        <material_1.Typography variant="h6" sx={{ mb: 2 }}>
          Order summary
        </material_1.Typography>
        <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <material_1.Typography>Item subtotal ({items.length})</material_1.Typography>
          <material_1.Typography>${subtotal.toFixed(2)}</material_1.Typography>
        </material_1.Box>
        <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <material_1.Typography>Shipping fee</material_1.Typography>
          <material_1.Typography>${shipping.toFixed(2)}</material_1.Typography>
        </material_1.Box>
        <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <material_1.Typography>HST</material_1.Typography>
          <material_1.Typography>${tax.toFixed(2)}</material_1.Typography>
        </material_1.Box>
        <material_1.Divider sx={{ mb: 2 }}/>
        <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <material_1.Typography variant="h6">Total</material_1.Typography>
          <material_1.Typography variant="h6">${total.toFixed(2)}</material_1.Typography>
        </material_1.Box>
        <material_1.Button variant="contained" color="primary" fullWidth sx={{ backgroundColor: '#000000' }}>
          Proceed to Checkout
        </material_1.Button>

        {/* 支付图标部分 */}
        <material_1.Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
        }}>
          <img src="/images/Checkout/visa.svg" alt="Visa" style={{ width: '37px', height: '32px' }}/>
          <img src="/images/Checkout/masterCard.svg" alt="MasterCard" style={{ width: '37px', height: '32px' }}/>
          <img src="/images/Checkout/paypal.svg" alt="PayPal" style={{ width: '37px', height: '32px' }}/>
          <img src="/images/Checkout/applePay.svg" alt="Apple Pay" style={{ width: '37px', height: '32px' }}/>
        </material_1.Box>
      </material_1.Box>
    </material_1.Box>);
};
exports.default = CheckoutPageComponent;
//# sourceMappingURL=CheckoutPageComponent.js.map