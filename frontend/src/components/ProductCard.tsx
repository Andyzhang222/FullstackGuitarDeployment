import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from '@mui/material';
import { Product } from '../types/types';

interface ProductionCardProps {
  product: Product;
}

const ProductionCard: React.FC<ProductionCardProps> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image="images/test.jpg" // 使用产品的真实图像 URL
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
        <Rating name="read-only" value={parseFloat(product.rating)} readOnly />
        <Typography variant="body2" color="text.secondary">
          {product.reviews_count} reviews
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductionCard;
