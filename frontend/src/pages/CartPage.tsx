import React from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItem {
  name: string;
  price: string;
  image: string;
}

interface CartPageProps {
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

const CartPage: React.FC<CartPageProps> = ({
  items,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  // Calculate subtotal, tax, and total
  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const shipping = 30.0; // Temporary shipping cost
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + tax + shipping;

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        My Cart
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ flexBasis: '60%', pr: 2 }}>
          <FormControl component="fieldset" sx={{ mb: 4 }}>
            <FormLabel component="legend">
              Delivery or pick up options
            </FormLabel>
            <RadioGroup
              defaultValue="delivery"
              aria-label="delivery options"
              name="delivery-options"
            >
              <FormControlLabel
                value="delivery"
                control={<Radio />}
                label={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Box>
                      <Typography>Deliver to M5G2G4</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Free Shipping, Get it by Sat, Jul 27
                      </Typography>
                    </Box>
                    <Typography>$30.00</Typography>
                  </Box>
                }
              />
              <Divider />
              <FormControlLabel
                value="pickup"
                control={<Radio />}
                label={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Box>
                      <Typography>Pick up at Toronto Downtown</Typography>
                    </Box>
                    <Typography>Free</Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Item ({items.length})
          </Typography>

          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
                p: 2,
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={`/${item.image}`}
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    marginRight: '16px',
                    borderRadius: '8px',
                  }}
                />
                <Box>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Condition: Excellent
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Non-refundable
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  ${item.price}
                </Typography>
                <IconButton sx={{ ml: 2 }} onClick={() => onRemoveItem(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ flexBasis: '35%', pl: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order summary
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Item subtotal ({items.length})</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Shipping fee</Typography>
            <Typography>${shipping.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
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
            sx={{
              backgroundColor: '#000000',
              '&:hover': {
                backgroundColor: '#333333',
              },
            }}
            onClick={onProceedToCheckout}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
