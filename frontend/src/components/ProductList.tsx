import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch products from API
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Guitars
      </Typography>
      <Grid container spacing={4}>
        {products
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
      <Pagination
        count={Math.ceil(products.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
    </Container>
  );
};

export default ProductList;
