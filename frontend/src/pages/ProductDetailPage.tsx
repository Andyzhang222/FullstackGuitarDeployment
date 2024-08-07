// pages/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Product } from '../types/types';
import Header from '../components/Header/Header';
import GlobalHeader from '../components/Header/GlobalHeader';
import Footer from '../components/Footer/Footer';
import { Container, Button, Card, Box } from '@mui/material';
import ProductImages from '../components/ProductDetailComponents/ProductImages';
import ProductDetails from '../components/ProductDetailComponents/ProductDetails';
import ProductAdditionalDetails from '../components/ProductDetailComponents/ProductAdditionalDetails';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { product: initialProduct } = location.state || {};
  const [product, setProduct] = useState<Product | null>(
    initialProduct || null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Initial Product from location.state:', initialProduct);

    if (!product) {
      console.log('Fetching product data from API with id:', id);
      fetch(`http://localhost:5001/api/products/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data: Product) => {
          console.log('Fetched product data:', data);
          setProduct(data);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          setError(`Failed to fetch product: ${error.message}`);
        });
    } else {
      console.log('Using initial product:', product);
    }
  }, [id, product, initialProduct]);

  const handleBackClick = () => {
    navigate('/');
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
      <GlobalHeader />
      <Container maxWidth={false} sx={{ width: '100%' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackClick}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
        <Card sx={{ mx: 'auto', mt: 5 }}>
          <Box sx={{ display: 'flex' }}>
            <ProductImages image={product.image} alt={product.name} />
            <ProductDetails
              name={product.name}
              description={product.description}
              price={product.price}
              brand={product.brand}
              category={product.category}
              quantity={product.quantity}
              inStock={product.inStock}
            />
          </Box>
        </Card>
        <ProductAdditionalDetails />
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;
