import React from 'react';
import { useSelector } from 'react-redux';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  selectCartItems,
  selectOutOfStockItems, // 导入选择器来检查库存不足
} from '../../components/store/cartSlice';
import CartItemCard from './CartItemCard';
import { useNavigate } from 'react-router-dom'; // 导入useNavigate

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const items = useSelector(selectCartItems);
  const outOfStockItems = useSelector(selectOutOfStockItems); // 获取库存不足的商品
  const navigate = useNavigate(); // 使用useNavigate来导航到新页面

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
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

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2 }}>
          {items.length > 0 ? (
            items.map((item) => (
              <CartItemCard
                key={item.productId}
                productId={item.productId}
                name={item.name}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
              />
            ))
          ) : (
            <Typography>Your cart is currently empty.</Typography>
          )}
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Order Summary</Typography>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>Estimated Shipping</Typography>
              <Typography>$0.00</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>Estimated Tax (15%)</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: isCheckoutDisabled ? '#aaaaaa' : '#000000', // 当禁用时，按钮颜色变灰
                '&:hover': {
                  backgroundColor: isCheckoutDisabled ? '#aaaaaa' : '#333333',
                },
              }}
              onClick={handleCheckout}
              disabled={isCheckoutDisabled} // 如果有库存不足的商品，则禁用按钮
            >
              Checkout
            </Button>
            {/* 显示库存不足的警告 */}
            {isCheckoutDisabled && (
              <Typography color="error" sx={{ mt: 2 }}>
                You have items that are out of stock. Please adjust quantities
                before checking out.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
