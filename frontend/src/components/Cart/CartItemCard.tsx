import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../components/store/store';
import {
  removeFromCart,
  addToCart,
  fetchCartItems,
} from '../../components/store/cartSlice'; // 引入 addToCart 和 fetchCartItems 方法
import axios from 'axios';
import BASE_URL from '../../config';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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
    // 当组件加载时检查库存
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
      .then(() => dispatch(fetchCartItems())) // 更新购物车数据
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
      console.log('Item successfully added to cart.');
      dispatch(fetchCartItems()); // 更新购物车数据
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      dispatch(removeFromCart(productId))
        .unwrap()
        .then(() => dispatch(fetchCartItems())) // 更新购物车数据
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
        {!inStock && (
          <Typography color="error">
            Only {availableQuantity} in stock
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* 减号按钮 */}
        <IconButton onClick={handleDecrementQuantity} disabled={!inStock}>
          <RemoveIcon />
        </IconButton>
        {/* 显示当前数量 */}
        <Typography>{quantity}</Typography>
        {/* 加号按钮 */}
        <IconButton
          onClick={handleIncrementQuantity}
          disabled={availableQuantity !== null && quantity >= availableQuantity}
        >
          <AddIcon />
        </IconButton>
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
        onClick={handleRemoveItem} // 处理移除商品
        disabled={!inStock} // 如果库存不足，禁用按钮
      >
        Delete
      </Button>
    </Box>
  );
};

export default CartItemCard;
