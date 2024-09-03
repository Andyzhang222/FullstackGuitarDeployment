import React from 'react';
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  styled,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  removeFromCart,
} from '../../components/store/cartSlice';
import { AppDispatch } from '../../components/store/store'; // 引入 AppDispatch

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginRight: theme.spacing(4),
  '.MuiRadio-root': {
    color: '#6E6E73',
    '&.Mui-checked': {
      color: '#007BFF',
    },
  },
  '.MuiTypography-root': {
    fontWeight: 500,
    fontSize: '16px',
    color: '#02000C',
  },
}));

const CheckoutPage = () => {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch<AppDispatch>(); // 使用 AppDispatch 类型

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const tax = subtotal * 0.15;
  const shipping = 30; // 示例运费
  const total = subtotal + tax + shipping;

  const handleRemoveItem = async (productId: string) => {
    try {
      await dispatch(removeFromCart(productId)).unwrap(); // 使用 unwrap 解包结果
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '24px',
      }}
    >
      <Box sx={{ width: '65%' }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          My Cart ({items.length})
        </Typography>
        <RadioGroup row defaultValue="delivery" sx={{ mb: 4 }}>
          <StyledFormControlLabel
            value="delivery"
            control={<Radio />}
            label="Deliver to M5G2G4"
          />
          <StyledFormControlLabel
            value="pickup"
            control={<Radio />}
            label="Pick up at Toronto Downtown"
          />
        </RadioGroup>

        {items.map((item) => (
          <Box
            key={item.productId}
            sx={{ display: 'flex', mb: 3, alignItems: 'center' }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
                mr: 3,
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Condition: Excellent
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                ${item.price} x {item.quantity}
              </Typography>
            </Box>
            <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
              Save for later
            </Button>
            <Button
              variant="text"
              color="error"
              sx={{ ml: 2 }}
              onClick={() => handleRemoveItem(item.productId)} // 使用 handleRemoveItem 处理删除操作
            >
              Remove
            </Button>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          width: '30%',
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
      </Box>
    </Box>
  );
};

export default CheckoutPage;
