import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card onClick={handleCardClick}>
      <CardActionArea>
        <CardMedia
          image={product.image}
          title={product.name}
          style={{ height: 140 }}
        />
        <CardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body2">{product.description}</Typography>
          <Typography variant="h6">${product.price}</Typography>
          <Typography variant="body2">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
