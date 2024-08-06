import React from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import { Product } from '../../types/types';
import { BodyText, PriceTag } from '../../theme/customStyles';

interface HomePageProductCardProps {
  product: Product;
  onClick: () => void;
}

// 定义图片路径数组
const imagePaths: string[] = [
  'images/ProductImage/1.png',
  'images/ProductImage/2.png',
  'images/ProductImage/3.png',
  'images/ProductImage/4.png',
  'images/ProductImage/5.png',
  'images/ProductImage/6.png',
  'images/ProductImage/7.png',
  'images/ProductImage/8.png',
  'images/ProductImage/9.png',
  'images/ProductImage/10.png',
];

const HomePageProductCard: React.FC<HomePageProductCardProps> = ({
  product,
  onClick,
}) => {
  // 随机选择图片
  const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];

  return (
    <Card
      sx={{
        width: '240px',
        height: '336px',
        borderRadius: '8px',
        mb: 2,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="240px"
        width="240px"
        image={randomImage}
        alt={product.name}
        sx={{
          borderRadius: '8px 8px 8px 8px',
        }}
      />
      <CardContent sx={{ padding: '0px', marginTop: '8px' }}>
        <BodyText
          style={{
            marginBottom: '0.5rem',
            whiteSpace: 'nowrap', // 强制文本在一行显示
            overflow: 'hidden', // 隐藏溢出部分
            textOverflow: 'ellipsis', // 用省略号替换溢出的文本
            color: 'black',
          }}
        >
          {product.name}
        </BodyText>
        <BodyText style={{ color: '#595959', marginTop: '2px' }}>
          Quantity: {product.quantity}{' '}
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </BodyText>
        <PriceTag style={{ marginTop: '4px' }}>${product.price}</PriceTag>
      </CardContent>
    </Card>
  );
};

export default HomePageProductCard;
