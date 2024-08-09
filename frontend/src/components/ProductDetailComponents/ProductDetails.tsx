// import 相关的包
import React, { useState } from 'react';
import { Typography, Button, Box, Divider, Dialog } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';
import { format, addDays } from 'date-fns';

// 定义组件的 props 类型
interface ProductDetailsProps {
  name: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  quantity: number;
  inStock: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ name, price }) => {
  const deliveryDate = format(addDays(new Date(), 7), 'EEE, MMM d');
  const [openLocationDialog, setOpenLocationDialog] = useState(false);

  // 打开 Dialog 的函数
  const handleLocationClick = () => {
    setOpenLocationDialog(true);
  };

  // 关闭 Dialog 的函数
  const handleCloseLocationDialog = () => {
    setOpenLocationDialog(false);
  };

  return (
    <Box
      sx={{
        width: '502px',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        marginLeft: '48px',
        padding: '16px',
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
        <Typography
          component="span"
          sx={{
            marginLeft: '8px',
            fontSize: '18px',
            color: '#757575',
            textDecoration: 'line-through',
          }}
        >
          New guitar: $999.99
        </Typography>
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
          marginBottom: '24px',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        Add to Cart
      </Button>
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
        onClick={handleLocationClick} // 点击时打开 Dialog
      >
        <Box>
          <Typography
            variant="body1"
            sx={{ display: 'flex', alignItems: 'center', color: '#000000' }}
          >
            <LocalShippingIcon sx={{ marginRight: '8px', color: '#000000' }} />
            Deliver to M5G2G4
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Free Shipping, Get it by {deliveryDate}
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
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
        Protect your shipment
      </Typography>
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

      {/* 这个部分是 Dialog 组件，用来弹出额外信息 */}
      <Dialog
        open={openLocationDialog} // 是否打开由 state 管理
        onClose={handleCloseLocationDialog} // 点击关闭时调用
        fullWidth
        maxWidth="sm"
      >
        <Box p={4}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Set Delivery Location
          </Typography>
          {/* 你可以在这里添加更多的内容，如表单等 */}
          <Button
            variant="contained"
            sx={{ marginTop: '16px' }}
            onClick={handleCloseLocationDialog}
          >
            Save
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProductDetails;
