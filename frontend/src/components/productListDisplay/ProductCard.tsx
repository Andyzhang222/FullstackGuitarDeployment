import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Product } from '../../types/types';

interface ProductionCardProps {
  product: Product;
  onClick: () => void;
}

const ProductionCard: React.FC<ProductionCardProps> = ({
  product,
  onClick,
}) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }} onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image="images/test.jpg"
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} | {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity: {product.quantity}{' '}
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductionCard;
