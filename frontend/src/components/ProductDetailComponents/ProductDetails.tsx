import React, { useState } from 'react';
import { Typography, Button, Box, Divider } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';
import { format, addDays } from 'date-fns';
import LocationModal from '../RightSideInfoComponents/LocationModal';
import CartDrawer from '../Cart/CartDrawer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../config';
import { useCart } from '../../context/CartContext'; // 引入 CartContext
import { CartItem } from '../../types/cartTypes';

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

const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  price,
  image,
}) => {
  const { id: productId } = useParams<{ id: string }>();
  const deliveryDate = format(addDays(new Date(), 7), 'EEE, MMM d');
  const [address, setAddress] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cartItems, setCartItems } = useCart(); // 使用 CartContext

  const handleToggleLocationModal = () => {
    setShowLocationModal(!showLocationModal);
  };

  const handleSaveAddress = (newAddress: string) => {
    setAddress(newAddress);
    localStorage.setItem('address', newAddress);
    setShowLocationModal(false);
  };

  const handleAddToCart = async () => {
    if (productId) {
      const newItem: CartItem = {
        productId,
        name,
        price,
        image,
        quantity: 1, // Add the quantity here, default to 1
      };

      const existingItemIndex = cartItems.findIndex(
        (item) => item.productId === productId
      );

      let updatedCartItems;
      if (existingItemIndex !== -1) {
        updatedCartItems = cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCartItems = [...cartItems, newItem];
      }

      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      const token = localStorage.getItem('accessToken');
      console.log('Sending request to backend with token:', token);
      console.log('Request body:', { productId, quantity: 1 });

      try {
        await axios.post(
          `${BASE_URL}:5001/carts`,
          { productId, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Item successfully added to cart.');
        setShowCart(true); // 显示购物车抽屉
      } catch (error) {
        console.error('Failed to add item to cart:', error);
      }
    } else {
      console.error('Product ID is undefined');
    }
  };

  const handleBuyItNow = async () => {
    await handleAddToCart(); // 先将商品添加到购物车
    setShowCart(true); // 然后显示购物车抽屉
  };

  const handleRemoveItem = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
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
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          width: '100%',
          height: '48px',
          borderRadius: '4px',
          marginBottom: '16px',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
        onClick={handleBuyItNow} // 添加点击事件处理函数
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
          marginBottom: '16px',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>

      <CartDrawer
        open={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems} // 使用共享的 cartItems
        onRemoveItem={handleRemoveItem}
      />

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
