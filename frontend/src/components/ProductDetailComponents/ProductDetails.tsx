// components/ProductDetail/ProductDetails.tsx
import React from 'react';
import { Typography, Button, Box, Divider } from '@mui/material';

interface ProductDetailsProps {
  name: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  quantity: number;
  inStock: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ name, price }) => {
  return (
    <Box
      sx={{
        width: '502px',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #EFEFEF',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginBottom: '8px' }}
      >
        Condition: Excellent
      </Typography>
      <Typography
        variant="h6"
        color="text.primary"
        sx={{ fontWeight: 'bold', fontSize: '32px', marginBottom: '8px' }}
      >
        ${price}
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          width: '100%',
          height: '48px',
          borderRadius: '4px',
          marginBottom: '16px',
        }}
      >
        Buy It Now
      </Button>
      <Button
        variant="outlined"
        sx={{
          borderColor: '#000000',
          color: '#000000',
          width: '100%',
          height: '48px',
          borderRadius: '4px',
          marginBottom: '24px',
        }}
      >
        Add to Cart
      </Button>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
        How to get it
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <Box>
          <Typography variant="body1">
            <span role="img" aria-label="truck">
              🚚
            </span>{' '}
            Deliver to M5G2G4
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Free Shipping, Get it by Sat, Jul 27
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontSize: '24px' }}>
          &gt;
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: '16px' }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <Box>
          <Typography variant="body1">
            <span role="img" aria-label="store">
              🏬
            </span>{' '}
            Pick up at Toronto Downtown
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontSize: '24px' }}>
          &gt;
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: '16px' }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
        Protect your shipment
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <Typography variant="body1">
          $30 - Full refund if item is damaged
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">
          $10 - Half refund if item is damaged
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductDetails;
