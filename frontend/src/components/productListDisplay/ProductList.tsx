import React, { useEffect, useState } from 'react';
import ProductionCard from './ProductCard'; // 确保导入路径正确
import {
  Grid,
  Pagination,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import { Product, ApiResponse } from '../../types/types';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10); // 每页显示的产品数
  const [error, setError] = useState<string | null>(null);

  const [brand, setBrand] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const navigate = useNavigate();

  const fetchProducts = () => {
    console.log('Fetching products with the following parameters:');
    console.log('Page:', page);
    console.log('PageSize:', pageSize);
    console.log('Brand:', brand);
    console.log('Type:', type);
    console.log('MinPrice:', minPrice);
    console.log('MaxPrice:', maxPrice);
    console.log('Sort:', sort);
    console.log('Search:', search);

    const query = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      brand,
      type,
      minPrice,
      maxPrice,
      sort,
      search,
    }).toString();

    fetch(`http://localhost:5001/api/products?${query}`)
      .then((res) => {
        console.log('Response:', res);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: ApiResponse) => {
        console.log('Fetched data:', data);
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
  };

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize, brand, type, minPrice, maxPrice, sort, search]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleFilterChange = () => {
    console.log('Applying filters...');
    setPage(1); // 重置为第一页
    fetchProducts();
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
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
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Yamaha">Yamaha</MenuItem>
              <MenuItem value="Fender">Fender</MenuItem>
              <MenuItem value="Roland">Roland</MenuItem>
              <MenuItem value="Casio">Casio</MenuItem>
              <MenuItem value="Shure">Shure</MenuItem>
              <MenuItem value="Pioneer">Pioneer</MenuItem>
              <MenuItem value="Korg">Korg</MenuItem>
              <MenuItem value="AKG">AKG</MenuItem>
              <MenuItem value="Behringer">Behringer</MenuItem>
              <MenuItem value="Boss">Boss</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Acoustic">Acoustic</MenuItem>
              <MenuItem value="Electric">Electric</MenuItem>
              <MenuItem value="Digital">Digital</MenuItem>
              <MenuItem value="Dynamic">Dynamic</MenuItem>
              <MenuItem value="Controller">Controller</MenuItem>
              <MenuItem value="Analog">Analog</MenuItem>
              <MenuItem value="Over-Ear">Over-Ear</MenuItem>
              <MenuItem value="Interface">Interface</MenuItem>
              <MenuItem value="Distortion">Distortion</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="newest">Newest Arrivals</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilterChange}
          >
            Apply Filters
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductionCard
              product={product}
              onClick={() => handleProductClick(product.id)}
            />
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
