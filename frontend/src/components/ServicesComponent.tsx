import React from 'react';
import { Box, Typography } from '@mui/material';

const services = [
  {
    title: 'Free & Insured Shipping on Order',
    description:
      'Enjoy peace of mind with every purchase as we offer free shipping or insured shipping options, ensuring your guitar arrives safely.',
  },
  {
    title: 'Expert Customer Service',
    description:
      'Our dedicated customer service team is here to assist you with any inquiries, providing professional and friendly support every step of the way.',
  },
  {
    title: 'In-Store Pick Up',
    description:
      'We provide flexibility for you to pick up your guitars in person at our store locations, making it convenient and quick for you.',
  },
  {
    title: 'Pro Selection on Each Guitar',
    description:
      'Our experts carefully review each guitar to guarantee top-notch quality, ensuring you receive the best instrument available.',
  },
];

const ServicesComponent: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 72px',
        padding: '20px 0px',
        // width: '100%', // 调整宽度以匹配图像中的宽度
        height: '271px', // 调整高度以匹配图像中的高度
        // margin: '0px auto', // 水平居中
        border: '1px solid blue', // 仅供调试，可移除
      }}
    >
      {services.map((service, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '24%', // 调整每个服务项的最大宽度
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: '178px',
              height: '178px',
              borderRadius: '50%',
              backgroundColor: '#D9D9D9', // 灰色背景
              marginBottom: '26px', // 圆形和文字之间的间距
              marginTop: '0px', // 圆形和文字之间的间距
            }}
          />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {service.title}
          </Typography>
          {service.description && (
            <Typography variant="body2" color="textSecondary">
              {service.description}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ServicesComponent;
