"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const SortComponent = ({ sort, onSortChange, brand, onBrandChange, type, onTypeChange, minPrice, setMinPrice, maxPrice, setMaxPrice, }) => {
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
    const types = ['Acoustic', 'Electric'];
    const sorts = ['price-asc', 'price-desc', 'newest'];
    return (<material_1.Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
      <material_1.Grid item xs={2}>
        <material_1.FormControl fullWidth>
          <material_1.Autocomplete options={brands} value={brand} onChange={(e, newValue) => onBrandChange(newValue || '')} renderInput={(params) => (<material_1.TextField {...params} label="Brand" variant="outlined" sx={{
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
            }}/>)}/>
        </material_1.FormControl>
      </material_1.Grid>
      <material_1.Grid item xs={2}>
        <material_1.FormControl fullWidth>
          <material_1.Autocomplete options={types} value={type} onChange={(e, newValue) => onTypeChange(newValue || '')} renderInput={(params) => (<material_1.TextField {...params} label="Type" variant="outlined" sx={{
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
            }}/>)}/>
        </material_1.FormControl>
      </material_1.Grid>
      <material_1.Grid item xs={2}>
        <material_1.FormControl fullWidth>
          <material_1.Autocomplete options={sorts} value={sort} onChange={(e, newValue) => onSortChange(newValue || '')} renderInput={(params) => (<material_1.TextField {...params} label="Sort By" variant="outlined" sx={{
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
            }}/>)}/>
        </material_1.FormControl>
      </material_1.Grid>
      <material_1.Grid item xs={2}>
        <material_1.TextField label="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} fullWidth variant="outlined" sx={{
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
        }}/>
      </material_1.Grid>
      <material_1.Grid item xs={2}>
        <material_1.TextField label="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} fullWidth variant="outlined" sx={{
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
        }}/>
      </material_1.Grid>
    </material_1.Grid>);
};
exports.default = SortComponent;
//# sourceMappingURL=SortComponent.js.map