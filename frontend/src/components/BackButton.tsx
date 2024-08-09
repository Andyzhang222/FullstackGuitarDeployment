import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const ProductBreadcrumbs: React.FC<{ category: string }> = ({ category }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 2 }}>
      <Link
        underline="hover"
        color="inherit"
        href="/"
        sx={{ color: '#9e9e9e' }} // Home 链接颜色
      >
        Home
      </Link>
      <Typography color="textPrimary" sx={{ color: '#9e9e9e' }}>
        {category}
      </Typography>
      <Typography color="textPrimary" sx={{ fontWeight: 'bold' }}>
        Guitar Inventory ID: {id}
      </Typography>
    </Breadcrumbs>
  );
};

export default ProductBreadcrumbs;
