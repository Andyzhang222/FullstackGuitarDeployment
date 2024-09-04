import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import SaveIcon from '@mui/icons-material/BookmarkBorder'; // 保存图标
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../components/store/cartSlice';
import { AppDispatch } from '../../components/store/store';

interface CartItemProps {
  item: {
    productId: string;
    name: string;
    image: string;
    price: string;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveItem = async (productId: string) => {
    try {
      await dispatch(removeFromCart(productId)).unwrap();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  return (
    <Box sx={{ width: '746px', mb: 2 }}>
      {/* 商品内容区域 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center', // 保持顶部对齐
          mb: 3,
        }}
      >
        {/* 左侧：商品图片和信息 */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '8px',
              mr: 3,
            }}
          />
          <Box>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Condition: Excellent
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              ${item.price} x {item.quantity}
            </Typography>
          </Box>
        </Box>

        {/* 右侧：价格与操作按钮 */}
        <Box
          sx={{
            textAlign: 'right',
            minWidth: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 'auto' }}>
            ${item.price}
          </Typography>

          {/* 保存和删除按钮 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              mt: 'auto',
            }}
          >
            <Button
              variant="text"
              startIcon={<SaveIcon />}
              sx={{ color: '#000', textTransform: 'none' }}
            >
              Save for later
            </Button>
            <Button
              variant="text"
              startIcon={
                <img
                  src="/images/ShoppingCart/delete.svg"
                  alt="Delete Icon"
                  style={{ width: '20px', height: '20px' }}
                />
              }
              sx={{ color: 'black', textTransform: 'none' }} // 设置删除按钮样式
              onClick={() => handleRemoveItem(item.productId)}
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Box>

      {/* 分隔线 */}
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default CartItem;
