import React from 'react';
import { Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchCartItems, addToCart } from '../../components/store/cartSlice';
import { AppDispatch } from '../../components/store/store';
import axios from 'axios'; // 仅导入 axios

interface ProductActionsProps {
  productId: string;
  setShowCart: (value: boolean) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  setShowCart,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = async () => {
    if (productId) {
      try {
        console.log('Sending request to add item to cart:', {
          productId,
          quantity: 1,
        });
        await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
        console.log('Item successfully added to cart.');
        dispatch(fetchCartItems()); // 更新购物车数据
        setShowCart(true); // 展示购物车抽屉
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // 使用 axios 的类型守卫来确保 `error` 是 axios 的错误类型
          console.error(
            'Failed to add item to cart:',
            error.response ? error.response.data : error.message
          );
        } else {
          // 处理非 axios 错误的情况
          console.error('An unexpected error occurred:', error);
        }
      }
    } else {
      console.error('Product ID is undefined');
    }
  };

  const handleBuyItNow = async () => {
    await handleAddToCart(); // 先将商品添加到购物车
    setShowCart(true); // 然后显示购物车抽屉
  };

  return (
    <Box>
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
    </Box>
  );
};

export default ProductActions;
