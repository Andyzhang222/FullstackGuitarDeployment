import React from 'react';
import { Box, Typography } from '@mui/material';
import { TitleText } from '../theme/customStyles';

const LargeCategoryCard: React.FC<{ name: string }> = ({ name }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      width: '432px',
      height: '374px',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid red', // 仅供调试
    }}
  >
    <TitleText
      sx={{
        marginLeft: '42px',
        border: '1px solid red', // 仅供调试
      }}
    >
      {name}
    </TitleText>
    <Box
      sx={{
        width: '197px',
        height: '310px',
        margin: '32px 24px 32px 28px',
        backgroundColor: '#d0d0d0',
        borderRadius: '8px',
        border: '1px solid blue', // 仅供调试
      }}
    />
  </Box>
);

const SmallCategoryCard: React.FC<{ name: string }> = ({ name }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      width: '408px',
      height: '175px',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid green', // 仅供调试
      marginBottom: '16px', // 调整底部间距以保持一致的间隔
    }}
  >
    <Typography variant="h6" sx={{ color: '#000' }}>
      {name}
    </Typography>
    <Box
      sx={{
        width: '168px',
        height: '138px',
        backgroundColor: '#d0d0d0',
        borderRadius: '8px',
        border: '1px solid pink', // 仅供调试
      }}
    />
  </Box>
);

const BrowseByCategory: React.FC = () => {
  return (
    <Box
      sx={{
        width: 'calc(100% - 144px)', // 确保两边有72px的间距
        margin: '0 auto', // 居中对齐
        border: '1px solid red', // 外部框边框仅供调试
      }}
    >
      <TitleText sx={{ marginBottom: '16px', textAlign: 'left' }}>
        Browse by category
      </TitleText>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <LargeCategoryCard name="Classical Guitar" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SmallCategoryCard name="Acoustic Guitar" />
          <SmallCategoryCard name="Ukulele" />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SmallCategoryCard name="Semi-Acoustic Guitar" />
          <SmallCategoryCard name="Banjo" />
        </Box>
      </Box>
    </Box>
  );
};

export default BrowseByCategory;
