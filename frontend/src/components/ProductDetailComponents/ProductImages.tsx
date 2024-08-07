// components/ProductDetailComponents/ProductImages.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface ProductImagesProps {
  image: string;
  alt: string;
}

const ProductImage: React.FC<{
  image: string;
  alt: string;
  isMain?: boolean;
  isViewAll?: boolean;
}> = ({ image, alt, isMain, isViewAll }) => (
  <Box
    sx={{
      position: 'relative',
      width: isMain ? '614px' : '110px',
      height: isMain ? '614px' : '110px',
      borderRadius: isMain ? '8px 0px 0px 0px' : '8px',
      border: isMain ? 'none' : '1px solid #02000C',
      backgroundColor: '#EFEFEF',
      cursor: isMain ? 'default' : 'pointer',
      marginBottom: isMain ? 0 : '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: isViewAll ? 0.3 : 1, // 调整最后一个缩略图的透明度
    }}
  >
    <img
      src={image.startsWith('/') ? image : '/' + image}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: isMain ? '8px 0px 0px 0px' : '8px',
      }}
    />
    {isViewAll && (
      <Typography
        variant="h6"
        component="div"
        sx={{
          position: 'absolute',
          color: '#000',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        View All
      </Typography>
    )}
  </Box>
);

const ProductImages: React.FC<ProductImagesProps> = ({ image, alt }) => {
  const thumbnails = new Array(5).fill(image); // 使用主图作为所有缩略图

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: '24px', // 确保与主图有间距
        }}
      >
        {thumbnails.slice(0, 4).map((thumb, index) => (
          <ProductImage key={index} image={thumb} alt={alt} />
        ))}
        {/* 添加一个额外的 Box 组件以包含 "View All" 缩略图 */}
        <ProductImage image={image} alt="View All" isViewAll />
      </Box>
      <ProductImage image={image} alt={alt} isMain />
    </Box>
  );
};

export default ProductImages;
