// src/components/ProductDetailComponents/ProductDetails.tsx

import React, { useState } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';
import { format, addDays } from 'date-fns';
import LocationModal from '../RightSideInfoComponents/LocationModal';
import CartDrawer from '../Cart/CartDrawer';
import { useParams } from 'react-router-dom';
import ProductActions from './ProductActions';

interface ProductDetailsProps {
  name: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  quantity: number;
  inStock: boolean;
  image: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ name, price }) => {
  const { id: productId } = useParams<{ id: string }>();
  const deliveryDate = format(addDays(new Date(), 7), 'EEE, MMM d');
  const [address, setAddress] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleToggleLocationModal = () => {
    setShowLocationModal(!showLocationModal);
  };

  const handleSaveAddress = (newAddress: string) => {
    setAddress(newAddress);
    localStorage.setItem('address', newAddress);
    setShowLocationModal(false);
  };

  return (
    <Box
      sx={{
        width: '502px',
        borderRadius: '8px',
        marginLeft: '72px',
        marginRight: '72px',
      }}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{ fontWeight: 'bold', marginBottom: '8px' }}
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginBottom: '16px', color: '#757575' }}
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

      {/* 使用 ProductActions 组件 */}
      {productId && (
        <ProductActions productId={productId} setShowCart={setShowCart} />
      )}

      <CartDrawer open={showCart} onClose={() => setShowCart(false)} />

      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
        How to get it
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #E0E0E0',
          padding: '16px',
          borderRadius: '4px',
          marginBottom: '8px',
          cursor: 'pointer',
        }}
        onClick={handleToggleLocationModal}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{ display: 'flex', alignItems: 'center', color: '#000000' }}
          >
            <LocalShippingIcon sx={{ marginRight: '8px', color: '#000000' }} />
            Deliver to {address || 'Set your address'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {address
              ? `Free Shipping, Get it by ${deliveryDate}`
              : 'Click to set your delivery address'}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontSize: '24px', color: '#000000' }}>
          &gt;
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: '16px' }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #E0E0E0',
          padding: '16px',
          borderRadius: '4px',
          marginBottom: '16px',
        }}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{ display: 'flex', alignItems: 'center', color: '#000000' }}
          >
            <StoreIcon sx={{ marginRight: '8px', color: '#000000' }} />
            Pick up at Toronto Downtown
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontSize: '24px', color: '#000000' }}>
          &gt;
        </Typography>
      </Box>

      <Divider sx={{ marginBottom: '16px' }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px solid #E0E0E0',
          padding: '16px',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        <Typography variant="body1">
          $30 - Full refund if item is damaged
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px solid #E0E0E0',
          padding: '16px',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        <Typography variant="body1">
          $10 - Half refund if item is damaged
        </Typography>
      </Box>

      {showLocationModal && (
        <LocationModal
          onClose={handleToggleLocationModal}
          onSave={handleSaveAddress}
        />
      )}
    </Box>
  );
};

export default ProductDetails;
