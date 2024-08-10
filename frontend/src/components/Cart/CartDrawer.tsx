import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
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
          {/* 这里可以添加购物车商品列表 */}
          <Typography>Your cart is currently empty.</Typography>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth>
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
