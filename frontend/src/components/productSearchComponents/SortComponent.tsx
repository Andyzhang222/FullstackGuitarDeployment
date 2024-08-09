import React from 'react';
import { Grid, TextField, Autocomplete, FormControl } from '@mui/material';

interface SortComponentProps {
  sort: string;
  onSortChange: (value: string) => void;
  brand: string;
  onBrandChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
}

const SortComponent: React.FC<SortComponentProps> = ({
  sort,
  onSortChange,
  brand,
  onBrandChange,
  type,
  onTypeChange,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  const brands = [
    'Yamaha',
    'Fender',
    'Roland',
    'Casio',
    'Shure',
    'Pioneer',
    'Korg',
    'AKG',
    'Behringer',
    'Boss',
  ];
  const types = [
    'Acoustic',
    'Electric',
    'Digital',
    'Dynamic',
    'Controller',
    'Analog',
    'Over-Ear',
    'Interface',
    'Distortion',
  ];
  const sorts = ['price-asc', 'price-desc', 'newest'];

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <Autocomplete
            options={brands}
            value={brand}
            onChange={(e, newValue) => onBrandChange(newValue || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Brand"
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#000',
                    '&.Mui-focused': { color: '#000' },
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#000',
                    },
                    '&:hover fieldset': {
                      borderColor: '#000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000',
                    },
                  },
                }}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <Autocomplete
            options={types}
            value={type}
            onChange={(e, newValue) => onTypeChange(newValue || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type"
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#000',
                    '&.Mui-focused': { color: '#000' },
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#000',
                    },
                    '&:hover fieldset': {
                      borderColor: '#000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000',
                    },
                  },
                }}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <Autocomplete
            options={sorts}
            value={sort}
            onChange={(e, newValue) => onSortChange(newValue || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sort By"
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#000',
                    '&.Mui-focused': { color: '#000' },
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#000',
                    },
                    '&:hover fieldset': {
                      borderColor: '#000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000',
                    },
                  },
                }}
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiInputLabel-root': {
              color: '#000',
              '&.Mui-focused': { color: '#000' },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#000',
              },
              '&:hover fieldset': {
                borderColor: '#000',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000',
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiInputLabel-root': {
              color: '#000',
              '&.Mui-focused': { color: '#000' },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#000',
              },
              '&:hover fieldset': {
                borderColor: '#000',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000',
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SortComponent;
