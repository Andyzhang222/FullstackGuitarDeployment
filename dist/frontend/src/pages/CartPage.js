"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const Delete_1 = tslib_1.__importDefault(require("@mui/icons-material/Delete"));
const CartPage = ({ items, onRemoveItem, onProceedToCheckout, }) => {
    // Calculate subtotal, tax, and total
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const shipping = 30.0; // Temporary shipping cost
    const tax = subtotal * 0.15; // 15% tax
    const total = subtotal + tax + shipping;
    return (<material_1.Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 4, p: 2 }}>
      <material_1.Typography variant="h4" sx={{ mb: 4 }}>
        My Cart
      </material_1.Typography>

      <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <material_1.Box sx={{ flexBasis: '60%', pr: 2 }}>
          <material_1.FormControl component="fieldset" sx={{ mb: 4 }}>
            <material_1.FormLabel component="legend">
              Delivery or pick up options
            </material_1.FormLabel>
            <material_1.RadioGroup defaultValue="delivery" aria-label="delivery options" name="delivery-options">
              <material_1.FormControlLabel value="delivery" control={<material_1.Radio />} label={<material_1.Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                    <material_1.Box>
                      <material_1.Typography>Deliver to M5G2G4</material_1.Typography>
                      <material_1.Typography variant="body2" color="textSecondary">
                        Free Shipping, Get it by Sat, Jul 27
                      </material_1.Typography>
                    </material_1.Box>
                    <material_1.Typography>$30.00</material_1.Typography>
                  </material_1.Box>}/>
              <material_1.Divider />
              <material_1.FormControlLabel value="pickup" control={<material_1.Radio />} label={<material_1.Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                    <material_1.Box>
                      <material_1.Typography>Pick up at Toronto Downtown</material_1.Typography>
                    </material_1.Box>
                    <material_1.Typography>Free</material_1.Typography>
                  </material_1.Box>}/>
            </material_1.RadioGroup>
          </material_1.FormControl>

          <material_1.Typography variant="h6" sx={{ mb: 2 }}>
            Item ({items.length})
          </material_1.Typography>

          {items.map((item, index) => (<material_1.Box key={index} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
                p: 2,
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
            }}>
              <material_1.Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={`/${item.image}`} alt={item.name} style={{
                width: '100px',
                height: '100px',
                marginRight: '16px',
                borderRadius: '8px',
            }}/>
                <material_1.Box>
                  <material_1.Typography variant="body1">{item.name}</material_1.Typography>
                  <material_1.Typography variant="body2" color="textSecondary">
                    Condition: Excellent
                  </material_1.Typography>
                  <material_1.Typography variant="body2" color="textSecondary">
                    Non-refundable
                  </material_1.Typography>
                </material_1.Box>
              </material_1.Box>
              <material_1.Box sx={{ display: 'flex', alignItems: 'center' }}>
                <material_1.Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  ${item.price}
                </material_1.Typography>
                <material_1.IconButton sx={{ ml: 2 }} onClick={() => onRemoveItem(index)}>
                  <Delete_1.default />
                </material_1.IconButton>
              </material_1.Box>
            </material_1.Box>))}
        </material_1.Box>

        <material_1.Box sx={{ flexBasis: '35%', pl: 2 }}>
          <material_1.Typography variant="h6" sx={{ mb: 2 }}>
            Order summary
          </material_1.Typography>
          <material_1.Divider sx={{ mb: 2 }}/>
          <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <material_1.Typography>Item subtotal ({items.length})</material_1.Typography>
            <material_1.Typography>${subtotal.toFixed(2)}</material_1.Typography>
          </material_1.Box>
          <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <material_1.Typography>Shipping fee</material_1.Typography>
            <material_1.Typography>${shipping.toFixed(2)}</material_1.Typography>
          </material_1.Box>
          <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <material_1.Typography>HST</material_1.Typography>
            <material_1.Typography>${tax.toFixed(2)}</material_1.Typography>
          </material_1.Box>
          <material_1.Divider sx={{ mb: 2 }}/>
          <material_1.Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <material_1.Typography variant="h6">Total</material_1.Typography>
            <material_1.Typography variant="h6">${total.toFixed(2)}</material_1.Typography>
          </material_1.Box>
          <material_1.Button variant="contained" color="primary" fullWidth sx={{
            backgroundColor: '#000000',
            '&:hover': {
                backgroundColor: '#333333',
            },
        }} onClick={onProceedToCheckout}>
            Proceed to Checkout
          </material_1.Button>
        </material_1.Box>
      </material_1.Box>
    </material_1.Box>);
};
exports.default = CartPage;
//# sourceMappingURL=CartPage.js.map