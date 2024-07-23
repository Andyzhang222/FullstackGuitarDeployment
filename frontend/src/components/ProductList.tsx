import React, { useEffect, useState } from 'react';
import ProductionCard from './ProductCard';
import { Grid, Pagination, Typography } from '@mui/material';
import { Product, ApiResponse } from '../types/types';

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
        console.log('Response:', res); // 添加这一行来记录响应
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: ApiResponse) => {
        console.log('Fetched data:', data); // 添加这一行来记录获取的数据
        if (!data.products) {
          throw new Error('Products data is undefined');
        }
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
      })
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
        count={Math.ceil(totalProducts / pageSize)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2 }}
      />
    </div>
  );
};

export default ProductList;
