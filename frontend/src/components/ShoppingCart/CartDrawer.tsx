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

interface CartItem {
  name: string;
  price: string;
  image: string;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void; // 添加 onRemoveItem 属性
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  items,
  onRemoveItem,
}) => {
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
            items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <img
                  src={`http://localhost:3000/${item.image}`}
                  alt={item.name}
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography>{item.name}</Typography>
                  <Typography>${item.price}</Typography>
                </Box>
                <Button
                  sx={{
                    color: '#FFFFFF',
                    backgroundColor: '#000000',
                    '&:hover': {
                      backgroundColor: '#333333',
                    },
                  }}
                  onClick={() => onRemoveItem(index)}
                >
                  Remove
                </Button>
              </Box>
            ))
          ) : (
            <Typography>Your cart is currently empty.</Typography>
          )}
        </Box>
        <Divider />
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
    </Drawer>
  );
};

export default CartDrawer;
