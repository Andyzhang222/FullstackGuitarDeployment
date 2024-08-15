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
      sx={{
        mt: 2,
        mb: 2,
        ml: 7.2,
        mr: 7.2,
        padding: '8px 16px',
        backgroundColor: '#f5f5f5', // 添加背景颜色
        borderRadius: '8px', // 添加圆角
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // 添加阴影
      }}
    >
      <Link
        underline="hover"
        color="inherit"
        href="/"
        sx={{
          color: '#02000C', // 蓝色链接
          fontWeight: 'bold', // 加粗
          '&:hover': {
            color: '#02000C', // 深蓝色悬停效果
          },
        }}
      >
        Home
      </Link>
      {isSearchPage ? (
        <Link
          underline="hover"
          color="inherit"
          sx={{
            color: '#02000C',
            cursor: 'pointer',
            fontWeight: 'bold',
            '&:hover': {
              color: '#0056b3',
            },
          }}
          onClick={() => navigate('/search')}
        >
          Searching Page
        </Link>
      ) : (
        <Typography
          color="textPrimary"
          sx={{
            color: '#02000C',
            fontWeight: 'bold',
          }}
        >
          {category}
        </Typography>
      )}
      {!isSearchPage && id && (
        <Typography
          color="textPrimary"
          sx={{
            fontWeight: 'bold',
            color: '#6c757d', // 灰色，用于显示当前页面
          }}
        >
          Guitar Inventory ID: {id}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default ProductBreadcrumbs;
