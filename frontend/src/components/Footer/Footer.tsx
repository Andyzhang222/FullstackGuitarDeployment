import React from 'react';
import { Box, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#D9D9D9' }}>
      <Container
        maxWidth={false}
        sx={{
          height: '438px', // 设置 Footer 的高度
          maxWidth: '1440px', // 设置最大宽度
          margin: '0 auto', // 居中对齐
          padding: '20px', // 设置内边距
          boxSizing: 'border-box', // 确保边框和内边距包含在宽度和高度内
        }}
      >
        {/* 在这里添加 Footer 的内容 */}
      </Container>
    </Box>
  );
};

export default Footer;
