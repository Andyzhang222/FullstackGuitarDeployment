import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types/types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
} from '@mui/material';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setError(`Failed to fetch product: ${error.message}`);
      });
  }, [id]);

  const handleBackClick = () => {
    navigate('/home');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Container>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackClick}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
        <Card sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
          <CardMedia
            component="img"
            height="400"
            image="images/test.jpg"
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h4" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="h6" color="text.primary">
              ${product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Brand: {product.brand}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {product.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity: {product.quantity}{' '}
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;
