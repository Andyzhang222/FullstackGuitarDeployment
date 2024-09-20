import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../components/store/store';
import {
  removeFromCart,
  addToCart,
  fetchCartItems,
  removeEntireCartItem,
  checkStock,
} from '../../components/store/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItemCardProps {
  productId: string;
  name: string;
  image?: string;
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
  const [availableQuantity, setAvailableQuantity] = useState<number | null>(
    null
  ); // 单独管理此商品的可用库存

  // 当组件加载时检查当前商品的库存
  useEffect(() => {
    const checkItemStock = async () => {
      try {
        const response = await dispatch(checkStock()).unwrap();
        const stockResult = response.find(
          (item: { productId: string }) => item.productId === productId
        );
        if (stockResult) {
          setAvailableQuantity(stockResult.availableQuantity);
        }
      } catch (error) {
        console.error('Error checking stock:', error);
      }
    };

    checkItemStock();
  }, [dispatch, productId]);

  // 完全删除购物车项
  const handleRemoveItem = () => {
    dispatch(removeFromCart(productId))
      .unwrap()
      .then(() => dispatch(fetchCartItems()))
      .catch((error: unknown) => {
        console.error('Failed to remove item from cart:', error);
      });
  };

  // 删除整个商品
  const handleRemoveEntireItem = () => {
    dispatch(removeEntireCartItem(productId))
      .unwrap()
      .then(() => dispatch(fetchCartItems()))
      .catch((error: unknown) => {
        console.error('Failed to remove item from cart:', error);
      });
  };

  // 增加数量
  const handleIncrementQuantity = async () => {
    if (availableQuantity !== null && quantity < availableQuantity) {
      try {
        await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
        dispatch(fetchCartItems());
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    } else {
      console.log('Cannot add more items, stock is limited');
    }
  };

  // 减少数量
  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      dispatch(removeFromCart(productId))
        .unwrap()
        .then(() => dispatch(fetchCartItems()))
        .catch((error: unknown) => {
          console.error('Failed to decrement item quantity:', error);
        });
    } else {
      handleRemoveItem(); // 如果数量为1，直接删除该项
    }
  };

  const imagePath = image
    ? image.startsWith('/')
      ? image
      : `/${image}`
    : '/default-image-path.jpg';

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
        {/* 只有当用户数量超过库存时才显示库存不足的警告 */}
        {availableQuantity !== null && quantity > availableQuantity && (
          <Typography color="error">
            Only {availableQuantity} in stock
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '110px' }}>
        <IconButton
          onClick={handleDecrementQuantity}
          sx={{
            backgroundColor: '#f0f0f0',
            '&:hover': { backgroundColor: '#e0e0e0' },
            '&.Mui-disabled': { backgroundColor: '#f0f0f0' },
            borderRadius: '50%',
            padding: '6px',
            marginRight: '8px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" sx={{ mx: 1 }}>
          {quantity}
        </Typography>
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
            padding: '6px',
            marginLeft: '8px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
      {/* 确保垃圾箱按钮始终可点击 */}
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
        onClick={handleRemoveEntireItem} // 删除整个商品
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartItemCard;
