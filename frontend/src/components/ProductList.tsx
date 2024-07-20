import React, { useEffect, useState } from 'react';
import ProductionCard from './ProductCard';
import { Grid } from '@mui/material';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: ApiResponseProduct[]) => {
        console.log('Data received:', data);
        setProducts(data); // Directly set the data as Product[]
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch products');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductionCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
