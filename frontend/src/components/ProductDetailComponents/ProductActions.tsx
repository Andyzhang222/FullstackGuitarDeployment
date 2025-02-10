import React, { useState } from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchCartItems, addToCart } from '../../components/store/cartSlice';
import { AppDispatch } from '../../components/store/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ProductActionsProps {
  productId: string;
  setShowCart: (value: boolean) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  setShowCart,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setErrorMessage(null); // 清除错误消息

    const idToken = localStorage.getItem('idToken');
    if (!idToken) {
      console.warn('⚠️ 没有 idToken，跳转到登录页面');
      setOpen(true);
      return;
    }

    if (productId) {
      try {
        console.log('🛒 发送 Add to Cart 请求:', { productId, quantity: 1 });

        await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
        console.log('✅ 商品成功添加到购物车');

        dispatch(fetchCartItems()); // 更新购物车数据
        setShowCart(true); // 展示购物车抽屉
      } catch (error: unknown) {
        console.error('❌ Add to Cart 失败:', error);

        // ✅ 这里不再手动处理 401，而是交给 `apiClient.ts` 拦截器
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          console.warn(`⚠️ HTTP 错误状态码: ${status}`);

          if (status === 401) {
            console.warn('⚠️ 401 未授权，应该自动触发 refreshToken 逻辑');
            return; // ❌ 避免二次跳转登录
          }
        }

        setErrorMessage('添加购物车失败，请稍后重试');
      }
    } else {
      console.error('❌ Product ID 为空，无法添加购物车');
    }
  };

  const handleBuyItNow = async () => {
    await handleAddToCart(); // 先将商品添加到购物车
    setShowCart(true); // 然后显示购物车抽屉
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleLoginRedirect = () => {
    handleDialogClose();
    navigate('/sign');
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
        onClick={handleBuyItNow}
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

      {errorMessage && (
        <Alert severity="error" sx={{ marginTop: '16px' }}>
          {errorMessage}
        </Alert>
      )}

      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Please log in'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You need to log in to add items to your cart.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoginRedirect} color="primary" autoFocus>
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductActions;
