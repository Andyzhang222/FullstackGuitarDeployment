import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

const CategoryMenu: React.FC = () => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        flexWrap: 'nowrap', // 禁止换行
      }}
    >
      <Button
        sx={{
          color: '#000000',
          textTransform: 'none',
          minWidth: 'fit-content',
        }}
      >
        <Typography variant="body1">Classical Guitar</Typography>
      </Button>
      <Button
        sx={{
          color: '#000000',
          textTransform: 'none',
          minWidth: 'fit-content',
        }}
      >
        <Typography variant="body1">Acoustic Guitar</Typography>
      </Button>
      <Button
        sx={{
          color: '#000000',
          textTransform: 'none',
          minWidth: 'fit-content',
        }}
      >
        <Typography variant="body1">Semi-Acoustic Guitar</Typography>
      </Button>
      <Button
        sx={{
          color: '#000000',
          textTransform: 'none',
          minWidth: 'fit-content',
        }}
      >
        <Typography variant="body1">Ukulele</Typography>
      </Button>
      <Button
        sx={{
          color: '#000000',
          textTransform: 'none',
          minWidth: 'fit-content',
        }}
      >
        <Typography variant="body1">Banjo</Typography>
      </Button>
    </Grid>
  );
};

export default CategoryMenu;
