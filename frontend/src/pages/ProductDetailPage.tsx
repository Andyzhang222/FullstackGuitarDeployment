// pages/ProductDetailPage.tsx
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
import ProductBreadcrumbs from '../components/BackButton'; // 导入 Breadcrumbs 组件
import NewArrivalsProductDisplay from '../components/HomepageProductSuggestion/NewArrivalsProductDisplay';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
        <ProductBreadcrumbs category={product.category} />{' '}
        {/* 使用 Breadcrumbs 组件 */}
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'center', // 水平居中
            alignItems: 'center', // 垂直居中
            flexDirection: 'row', // 水平排列
            gap: 2, // 设置图片和详情之间的间距
            boxShadow: 'none', // 移除阴影
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
            />
          </Box>
        </Card>
        <ProductAdditionalDetails />
        <NewArrivalsProductDisplay />
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;
