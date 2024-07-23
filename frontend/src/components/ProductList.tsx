import React, { useEffect, useState } from 'react';
import ProductionCard from './ProductCard'; // 确保导入路径正确
import { Grid, Pagination, Typography } from '@mui/material';

// Define the types for API response and full product
interface ApiResponseProduct {
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

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10); // 每页显示的产品数
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `http://localhost:5001/api/products?page=${page}&pageSize=${pageSize}`
    )
      .then((res) => {
        console.log('Response:', res); // Add this line to log the response
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(
        (data: { products: ApiResponseProduct[]; totalProducts: number }) => {
          console.log('Fetched data:', data); // Add this line to log the fetched data
          if (!data.products) {
            throw new Error('Products data is undefined');
          }
          setProducts(
            data.products.map((product) => ({
              ...product,
              price: product.price,
              rating: product.rating,
            }))
          );
          setTotalProducts(data.totalProducts);
        }
      )
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(`Failed to fetch products: ${error.message}`);
      });
  }, [page, pageSize]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductionCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(totalProducts / pageSize)} // 总页数
        page={page} // 当前页码
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2 }}
      />
    </div>
  );
};

export default ProductList;
