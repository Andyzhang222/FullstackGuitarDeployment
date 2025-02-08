"use strict";
// src/components/ProductDetailComponents/ProductDetails.tsx
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const material_1 = require("@mui/material");
const LocalShipping_1 = tslib_1.__importDefault(require("@mui/icons-material/LocalShipping"));
const Store_1 = tslib_1.__importDefault(require("@mui/icons-material/Store"));
const date_fns_1 = require("date-fns");
const LocationModal_1 = tslib_1.__importDefault(require("../RightSideInfoComponents/LocationModal"));
const CartDrawer_1 = tslib_1.__importDefault(require("../Cart/CartDrawer"));
const react_router_dom_1 = require("react-router-dom");
const ProductActions_1 = tslib_1.__importDefault(require("./ProductActions"));
const ProductDetails = ({ name, price }) => {
    const { id: productId } = (0, react_router_dom_1.useParams)();
    const deliveryDate = (0, date_fns_1.format)((0, date_fns_1.addDays)(new Date(), 7), 'EEE, MMM d');
    const [address, setAddress] = (0, react_1.useState)('');
    const [showLocationModal, setShowLocationModal] = (0, react_1.useState)(false);
    const [showCart, setShowCart] = (0, react_1.useState)(false);
    const handleToggleLocationModal = () => {
        setShowLocationModal(!showLocationModal);
    };
    const handleSaveAddress = (newAddress) => {
        setAddress(newAddress);
        localStorage.setItem('address', newAddress);
        setShowLocationModal(false);
    };
    return (<material_1.Box sx={{
            width: '502px',
            borderRadius: '8px',
            marginLeft: '72px',
            marginRight: '72px',
        }}>
      <material_1.Typography variant="h4" component="div" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
        {name}
      </material_1.Typography>
      <material_1.Typography variant="body2" color="text.secondary" sx={{ marginBottom: '16px', color: '#757575' }}>
        Condition: Excellent
      </material_1.Typography>
      <material_1.Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold', fontSize: '32px', marginBottom: '8px' }}>
        ${price}
      </material_1.Typography>

      {/* 使用 ProductActions 组件 */}
      {productId && (<ProductActions_1.default productId={productId} setShowCart={setShowCart}/>)}

      <CartDrawer_1.default open={showCart} onClose={() => setShowCart(false)}/>

      <material_1.Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
        How to get it
      </material_1.Typography>
      <material_1.Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #E0E0E0',
            padding: '16px',
            borderRadius: '4px',
            marginBottom: '8px',
            cursor: 'pointer',
        }} onClick={handleToggleLocationModal}>
        <material_1.Box>
          <material_1.Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: '#000000' }}>
            <LocalShipping_1.default sx={{ marginRight: '8px', color: '#000000' }}/>
            Deliver to {address || 'Set your address'}
          </material_1.Typography>
          <material_1.Typography variant="body2" color="text.secondary">
            {address
            ? `Free Shipping, Get it by ${deliveryDate}`
            : 'Click to set your delivery address'}
          </material_1.Typography>
        </material_1.Box>
        <material_1.Typography variant="body1" sx={{ fontSize: '24px', color: '#000000' }}>
          &gt;
        </material_1.Typography>
      </material_1.Box>
      <material_1.Divider sx={{ marginBottom: '16px' }}/>
      <material_1.Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #E0E0E0',
            padding: '16px',
            borderRadius: '4px',
            marginBottom: '16px',
        }}>
        <material_1.Box>
          <material_1.Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: '#000000' }}>
            <Store_1.default sx={{ marginRight: '8px', color: '#000000' }}/>
            Pick up at Toronto Downtown
          </material_1.Typography>
        </material_1.Box>
        <material_1.Typography variant="body1" sx={{ fontSize: '24px', color: '#000000' }}>
          &gt;
        </material_1.Typography>
      </material_1.Box>

      <material_1.Divider sx={{ marginBottom: '16px' }}/>
      <material_1.Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid #E0E0E0',
            padding: '16px',
            borderRadius: '4px',
            marginBottom: '8px',
        }}>
        <material_1.Typography variant="body1">
          $30 - Full refund if item is damaged
        </material_1.Typography>
      </material_1.Box>
      <material_1.Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid #E0E0E0',
            padding: '16px',
            borderRadius: '4px',
            marginBottom: '8px',
        }}>
        <material_1.Typography variant="body1">
          $10 - Half refund if item is damaged
        </material_1.Typography>
      </material_1.Box>

      {showLocationModal && (<LocationModal_1.default onClose={handleToggleLocationModal} onSave={handleSaveAddress}/>)}
    </material_1.Box>);
};
exports.default = ProductDetails;
//# sourceMappingURL=ProductDetails.js.map