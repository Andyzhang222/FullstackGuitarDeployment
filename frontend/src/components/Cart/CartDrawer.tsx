import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../config';

interface CartItem {
  productId: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (updatedItems: CartItem[]) => void; // 更新为接收更新后的购物车项
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  items,
  onRemoveItem,
}) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('accessToken');

  // 计算小计、税和总计
  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const tax = subtotal * 0.15; // 15% 税
  const shipping = 0; // 临时运费
  const total = subtotal + tax + shipping;

  // 处理结账过程的函数
  const handleCheckout = async () => {
    if (!authToken) {
      // 如果用户未认证，重定向到登录页面
      navigate('/sign');
      return;
    }

    const cartData = { items };

    // 记录发送到后端的数据
    console.log('Data being sent to the backend:', cartData);

    try {
      // 发送购物车数据到后端
      await axios.post(`${BASE_URL}:5001/cart`, cartData, {
        headers: {
          Authorization: `Bearer ${authToken}`, // 使用 token
        },
      });

      // 提交成功后，关闭抽屉并导航到购物车页面
      onClose();
      navigate('/cart');
    } catch (error) {
      console.error('Error during checkout:', error);
      // 处理错误（例如显示通知）
    }
  };

  // 处理商品移除的函数
  const handleRemoveItem = async (index: number) => {
    const productId = items[index].productId; // 获取要删除商品的 productId

    console.log('Removing item from cart:', { productId });

    try {
      // 调用后端减少购物车项数量的接口
      await axios.post(
        `${BASE_URL}:5001/carts/remove`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // 更新前端购物车状态
      const updatedItems = items
        .map((item, i) => {
          if (i === index) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // 仅保留数量大于0的商品

      onRemoveItem(updatedItems); // 调用更新后的购物车状态
      console.log('Item quantity updated or removed from cart.');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2 }}>
          {items.length > 0 ? (
            items.map((item, itemIndex) => (
              <Box
                key={`${item.productId}-${itemIndex}`} // 使用产品 ID 和索引确保唯一性
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <img
                  src={`/${item.image}`}
                  alt={item.name}
                  style={{
                    width: '50px',
                    height: '50px',
                    marginRight: '10px',
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2">
                    ${item.price} x {item.quantity}
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
                  onClick={() => handleRemoveItem(itemIndex)} // 使用当前商品的索引
                >
                  Delete
                </Button>
              </Box>
            ))
          ) : (
            <Typography>Your cart is currently empty.</Typography>
          )}
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Order Summary</Typography>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>Estimated Shipping</Typography>
              <Typography>$0.00</Typography>
            </Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography>Estimated Tax (15%)</Typography>
              <Typography>${tax.toFixed(2)}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: '#000000',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
              onClick={handleCheckout} // Handle checkout click
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
