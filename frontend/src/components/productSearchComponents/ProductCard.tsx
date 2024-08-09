import React from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import { Product } from '../../types/types';
import { BodyText, PriceTag } from '../../theme/customStyles';

interface HomePageProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductionCard: React.FC<HomePageProductCardProps> = ({
  product,
  onClick,
}) => {
  return (
    <Card
      sx={{
        width: '240px',
        height: '336px',
        borderRadius: '8px',
        mb: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
      onClick={() => onClick(product)}
    >
      <CardMedia
        component="img"
        height="240px"
        width="240px"
        image={product.image}
        alt={product.name}
        sx={{
          borderRadius: '8px 8px 0 0',
        }}
      />
      <CardContent
        sx={{
          padding: '0px',
          marginTop: '8px',
          textAlign: 'center', // 使所有内容居中
        }}
      >
        <BodyText
          style={{
            marginBottom: '0.5rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: 'black',
          }}
        >
          {product.name}
        </BodyText>
        <BodyText style={{ color: '#595959', marginTop: '2px' }}>
          Quantity: {product.quantity}
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </BodyText>
        <PriceTag
          style={{
            marginTop: '4px',
            display: 'block',
            textAlign: 'center', // 居中显示价格
            fontWeight: 'bold',
          }}
        >
          ${product.price}
        </PriceTag>
      </CardContent>
    </Card>
  );
};

export default ProductionCard;
