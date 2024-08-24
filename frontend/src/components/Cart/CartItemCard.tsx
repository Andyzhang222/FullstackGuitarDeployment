// src/components/Cart/CartItemCard.tsx

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { itemRemoved } from '../../components/store/cartSlice';

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
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(itemRemoved(productId)); // 触发减少商品数量的逻辑
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
      }}
    >
      <img
        src={imagePath}
        alt={name}
        style={{
          width: '50px',
          height: '50px',
          marginRight: '10px',
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="body2">
          ${price} x {quantity}
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
        onClick={handleRemoveItem}
      >
        Delete
      </Button>
    </Box>
  );
};

export default CartItemCard;
