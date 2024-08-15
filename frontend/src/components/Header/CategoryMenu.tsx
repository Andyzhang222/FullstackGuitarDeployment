import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CategoryMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (type: string) => {
    // 导航到 search 页面并传递 type 参数
    navigate(`/search?type=${type}`);
  };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        flexWrap: 'nowrap',
        width: '650px',
      }}
    >
      <Button
        sx={{
          color: '#000000',
          textTransform: 'none',
          minWidth: 'fit-content',
        }}
        onClick={() => handleCategoryClick('Classical')}
      >
        <Typography variant="body1">Classical Guitar</Typography>
      </Button>
      <Button
        sx={{
          color: '#000000',
          textTransform: 'none',
          minWidth: 'fit-content',
        }}
        onClick={() => handleCategoryClick('Acoustic')}
      >
        <Typography variant="body1">Acoustic Guitar</Typography>
      </Button>
      <Button
        sx={{
          color: '#000000',
          textTransform: 'none',
          minWidth: 'fit-content',
        }}
        onClick={() => handleCategoryClick('Digital')}
      >
        <Typography variant="body1">Digital Guitar</Typography>
      </Button>
      <Button
        sx={{
          color: '#000000',
          textTransform: 'none',
          minWidth: 'fit-content',
        }}
        onClick={() => handleCategoryClick('Electric')}
      >
        <Typography variant="body1">Electric Guitar</Typography>
      </Button>
    </Grid>
  );
};

export default CategoryMenu;
