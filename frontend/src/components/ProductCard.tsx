import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  inStock: boolean;
  brand: string;
  category: string;
  sku: string;
  quantity: number;
  type: string;
  rating: string;
  reviews_count: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductionCardProps {
  product: Product;
}

const ProductionCard: React.FC<ProductionCardProps> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image="/images/test.jpg" // Update image source to use the product image
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
