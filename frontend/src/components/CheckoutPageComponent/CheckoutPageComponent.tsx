import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../components/store/cartSlice';
import AddressSelection from './AddressSelection'; // 引入 AddressSelection 组件
import CartItem from './CartItem'; // 引入新的 CartItem 组件

const CheckoutPageComponent: React.FC = () => {
  const items = useSelector(selectCartItems);

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const tax = subtotal * 0.15;
  const shipping = 30; // 示例运费
  const total = subtotal + tax + shipping;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '72px', // 左右边距
        paddingRight: '72px',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          My Cart ({items.length})
        </Typography>
        <AddressSelection /> {/* 在此处使用 AddressSelection 组件 */}
        {items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </Box>

      <Box
        sx={{
          width: '420px', // 固定宽度
          border: '1px solid #E0E0E0',
          borderRadius: '8px',
          padding: '16px',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Order summary
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography>Item subtotal ({items.length})</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography>Shipping fee</Typography>
          <Typography>${shipping.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography>HST</Typography>
          <Typography>${tax.toFixed(2)}</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${total.toFixed(2)}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ backgroundColor: '#000000' }}
        >
          Proceed to Checkout
        </Button>

        {/* 支付图标部分 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <img
            src="/images/Checkout/visa.svg"
            alt="Visa"
            style={{ width: '37px', height: '32px' }}
          />
          <img
            src="/images/Checkout/masterCard.svg"
            alt="MasterCard"
            style={{ width: '37px', height: '32px' }}
          />
          <img
            src="/images/Checkout/paypal.svg"
            alt="PayPal"
            style={{ width: '37px', height: '32px' }}
          />
          <img
            src="/images/Checkout/applePay.svg"
            alt="Apple Pay"
            style={{ width: '37px', height: '32px' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPageComponent;
