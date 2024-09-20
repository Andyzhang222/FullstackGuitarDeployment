import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../components/store/store';
import {
  removeFromCart,
  addToCart,
  fetchCartItems,
} from '../../components/store/cartSlice';
import axios from 'axios';
import BASE_URL from '../../config';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete'; // 引入垃圾桶图标

interface CartItemCardProps {
  productId: string;
  name: string;
  image?: string; // 允许 image 为 undefined
  price: string;
  quantity: number;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  productId,
  name,
  image,
  price,
  quantity,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [inStock, setInStock] = useState(true);
  const [availableQuantity, setAvailableQuantity] = useState<number | null>(
    null
  );

  useEffect(() => {
    const checkItemStock = async () => {
      try {
        const authToken = localStorage.getItem('accessToken'); // 从本地存储获取token
        const response = await axios.post(
          `${BASE_URL}/carts/check-stock`,
          { items: [{ productId, quantity }] },
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // 将token附加到请求头
            },
          }
        );
        const stockResult = response.data.stockResults[0];
        setInStock(stockResult.isInStock);
        setAvailableQuantity(stockResult.availableQuantity);
      } catch (error) {
        console.error('Error checking stock:', error);
      }
    };

    checkItemStock();
  }, [productId, quantity]);

  const handleRemoveItem = () => {
    dispatch(removeFromCart(productId))
      .unwrap()
      .then(() => dispatch(fetchCartItems()))
      .catch((error: unknown) => {
        console.error('Failed to remove item from cart:', error);
      });
  };

  const handleIncrementQuantity = async () => {
    try {
      console.log('Sending request to add item to cart:', {
        productId,
        quantity: 1,
      });
      await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
      dispatch(fetchCartItems());
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      dispatch(removeFromCart(productId))
        .unwrap()
        .then(() => dispatch(fetchCartItems()))
        .catch((error: unknown) => {
          console.error('Failed to decrement item quantity:', error);
        });
    } else {
      handleRemoveItem();
    }
  };

  const imagePath = image
    ? image.startsWith('/')
      ? image
      : `/${image}`
    : '/default-image-path.jpg'; // 如果 image 为空，使用默认图片路径

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        borderRadius: 2,
        p: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
      }}
    >
      <img
        src={imagePath}
        alt={name}
        style={{
          width: '60px',
          height: '60px',
          marginRight: '10px',
          borderRadius: '10px',
          objectFit: 'cover',
        }}
      />
      <Box sx={{ flexGrow: 1, maxWidth: '150px' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          ${price}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          x {quantity}
        </Typography>
        {!inStock && (
          <Typography color="error">
            Only {availableQuantity} in stock
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '110px' }}>
        {/* 自定义的减号按钮 */}
        <IconButton
          onClick={handleDecrementQuantity}
          sx={{
            backgroundColor: '#f0f0f0',
            '&:hover': { backgroundColor: '#e0e0e0' },
            '&.Mui-disabled': { backgroundColor: '#f0f0f0' },
            borderRadius: '50%',
            padding: '6px', // 减小按钮尺寸
            marginRight: '8px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        {/* 当前数量显示 */}
        <Typography variant="h6" sx={{ mx: 1 }}>
          {quantity}
        </Typography>
        {/* 自定义的加号按钮 */}
        <IconButton
          onClick={handleIncrementQuantity}
          disabled={availableQuantity !== null && quantity >= availableQuantity}
          sx={{
            backgroundColor: '#f0f0f0',
            '&:hover': { backgroundColor: '#e0e0e0' },
            '&.Mui-disabled': {
              backgroundColor: '#f0f0f0',
              color: '#b0b0b0',
              boxShadow: 'none',
            },
            borderRadius: '50%',
            padding: '6px', // 减小按钮尺寸
            marginLeft: '8px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
      {/* 使用垃圾桶图标替代删除按钮 */}
      <IconButton
        sx={{
          color: 'black',
          '&:hover': {
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
          },
          width: '50px',
          minWidth: '50px',
          marginLeft: '10px',
          borderRadius: '5px',
        }}
        onClick={handleRemoveItem}
        disabled={!inStock}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartItemCard;
