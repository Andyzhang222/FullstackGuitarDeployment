import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { itemRemoved, selectCartItems } from '../../components/store/cartSlice';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const handleRemoveItem = (productId: string) => {
    dispatch(itemRemoved(productId)); // 使用 Redux dispatch 移除商品
  };

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const tax = subtotal * 0.15; // 15% 税
  const shipping = 0; // 临时运费
  const total = subtotal + tax + shipping;

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
            items.map((item) => {
              const imagePath = item.image.startsWith('/')
                ? item.image
                : `/${item.image}`;
              return (
                <Box
                  key={item.productId}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <img
                    src={imagePath}
                    alt={item.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      marginRight: '10px',
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body2">
                      ${item.price} x {item.quantity}
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      color: '#FFFFFF',
                      backgroundColor: '#000000',
                      '&:hover': {
                        backgroundColor: '#333333',
                      },
                      width: '100px',
                      minWidth: '100px',
                    }}
                    onClick={() => handleRemoveItem(item.productId)} // 处理移除商品
                  >
                    Delete
                  </Button>
                </Box>
              );
            })
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
                backgroundColor: '#000000',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
