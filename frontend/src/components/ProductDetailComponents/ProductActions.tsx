import React, { useState } from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

  const handleAddToCart = async () => {
    const idToken = localStorage.getItem('idToken');

    if (!idToken) {
      setOpen(true); // 未登录时弹出登录对话框
      return;
    }

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
          console.error(
            'Failed to add item to cart:',
            error.response ? error.response.data : error.message
          );
        } else {
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
