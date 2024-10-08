import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Typography } from '@mui/material';
import { Product, ApiResponse } from '../../types/types';
import { useNavigate, useLocation } from 'react-router-dom';
import SortComponent from './SortComponent';
import ProductionCard from './ProductCard';
import BASE_URL from '../../config';

interface ProductListProps {
  searchTerm: string;
}

const ProductList: React.FC<ProductListProps> = ({ searchTerm }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(12);
  const [error, setError] = useState<string | null>(null);

  const [brand, setBrand] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sort, setSort] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();

  // 清空筛选条件函数
  const resetFilters = () => {
    setBrand('');
    setType('');
    setMinPrice('');
    setMaxPrice('');
    setSort('');
  };

  // 当 location.search 或者 searchTerm 变化时重置筛选条件
  useEffect(() => {
    resetFilters(); // 每次导航或新的搜索时清空筛选条件
  }, [location.search, searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    if (typeParam) {
      setType(typeParam);
    }
  }, [location.search]);

  const fetchProducts = () => {
    const query = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      brand,
      type,
      minPrice,
      maxPrice,
      sort,
      search: searchTerm,
    }).toString();

    fetch(`${BASE_URL}:5001/api/products?${query}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: ApiResponse) => {
        if (!data.products) {
          throw new Error('Products data is undefined');
        }
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
      })
      .catch((error) => {
        setError(`Failed to fetch products: ${error.message}`);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize, brand, type, minPrice, maxPrice, sort, searchTerm]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const handleBrandChange = (value: string) => {
    setBrand(value);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        marginLeft: '72px',
        marginRight: '72px',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }}
      >
        Product List
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={12} md={12}>
          <SortComponent
            sort={sort}
            onSortChange={handleSortChange}
            brand={brand}
            onBrandChange={handleBrandChange}
            type={type}
            onTypeChange={handleTypeChange}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ mt: 2 }} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id}>
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
        sx={{
          mt: 2,
          '& .MuiPaginationItem-root': {
            color: '#000',
            '&.Mui-selected': {
              backgroundColor: '#000',
              color: '#fff',
            },
            '&.MuiPaginationItem-page:hover': {
              backgroundColor: '#555',
            },
          },
          '& .MuiPaginationItem-ellipsis': {
            color: '#000',
          },
          '& .MuiPaginationItem-previousNext': {
            color: '#000',
          },
        }}
      />
    </div>
  );
};

export default ProductList;
