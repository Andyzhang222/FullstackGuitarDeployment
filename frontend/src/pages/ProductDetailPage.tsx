import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Product } from '../types/types';
import Header from '../components/Header/Header';
import GlobalHeader from '../components/Header/GlobalHeader';
import Footer from '../components/Footer/Footer';
import { Container, Card, Box } from '@mui/material';
import ProductImages from '../components/ProductDetailComponents/ProductImages';
import ProductDetails from '../components/ProductDetailComponents/ProductDetails';
import ProductAdditionalDetails from '../components/ProductDetailComponents/ProductAdditionalDetails';
import ProductBreadcrumbs from '../components/BackButton';
import NewArrivalsProductDisplay from '../components/HomepageProductSuggestion/NewArrivalsProductDisplay';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { product: initialProduct } = location.state || {};
  const [product, setProduct] = useState<Product | null>(
    initialProduct || null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!product) {
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
          setError(`Failed to fetch product: ${error.message}`);
        });
    }
  }, [id, product]);

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
        <ProductBreadcrumbs category={product.category} />
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 2,
            boxShadow: 'none',
          }}
        >
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
              image={product.image} // 传递 image 属性
            />
          </Box>
        </Card>
        <ProductAdditionalDetails />
        <NewArrivalsProductDisplay />
        <ProductBreadcrumbs category={product.category} />
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
