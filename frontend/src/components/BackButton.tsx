import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const ProductBreadcrumbs: React.FC<{ category: string }> = ({ category }) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // 判断是否在搜索页面
  const isSearchPage = location.pathname.includes('/search');

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ mt: 2, mb: 2, ml: 7.2, mr: 7.2, border: '1px solid red' }}
    >
      {' '}
      <Link
        underline="hover"
        color="inherit"
        href="/"
        sx={{ color: '#02000C' }} // Home 链接颜色
      >
        Home
      </Link>
      {isSearchPage ? (
        <Link
          underline="hover"
          color="inherit"
          sx={{ color: '#02000C', cursor: 'pointer' }} // 设置成Link，用户可以点击导航到搜索页面
          onClick={() => navigate('/search')}
        >
          Searching Page
        </Link>
      ) : (
        <Typography color="textPrimary" sx={{ color: '#02000C' }}>
          {category}
        </Typography>
      )}
      {!isSearchPage &&
        id && ( // 只有在不是搜索页面时显示 Guitar Inventory ID
          <Typography color="textPrimary" sx={{ fontWeight: 'bold' }}>
            Guitar Inventory ID: {id}
          </Typography>
        )}
    </Breadcrumbs>
  );
};

export default ProductBreadcrumbs;
