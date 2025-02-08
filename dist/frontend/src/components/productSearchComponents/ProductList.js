"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const SortComponent_1 = tslib_1.__importDefault(require("./SortComponent"));
const ProductCard_1 = tslib_1.__importDefault(require("./ProductCard"));
const config_1 = tslib_1.__importDefault(require("../../config"));
const ProductList = ({ searchTerm }) => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [totalProducts, setTotalProducts] = (0, react_1.useState)(0);
    const [page, setPage] = (0, react_1.useState)(1);
    const [pageSize] = (0, react_1.useState)(12);
    const [error, setError] = (0, react_1.useState)(null);
    const [brand, setBrand] = (0, react_1.useState)('');
    const [type, setType] = (0, react_1.useState)('');
    const [minPrice, setMinPrice] = (0, react_1.useState)('');
    const [maxPrice, setMaxPrice] = (0, react_1.useState)('');
    const [sort, setSort] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    // 清空筛选条件函数
    const resetFilters = () => {
        setBrand('');
        setType('');
        setMinPrice('');
        setMaxPrice('');
        setSort('');
    };
    // 当 location.search 或者 searchTerm 变化时重置筛选条件
    (0, react_1.useEffect)(() => {
        resetFilters(); // 每次导航或新的搜索时清空筛选条件
    }, [location.search, searchTerm]);
    (0, react_1.useEffect)(() => {
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
        fetch(`${config_1.default}:5001/api/products?${query}`)
            .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
            .then((data) => {
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
    (0, react_1.useEffect)(() => {
        fetchProducts();
    }, [page, pageSize, brand, type, minPrice, maxPrice, sort, searchTerm]);
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const handleSortChange = (value) => {
        setSort(value);
    };
    const handleBrandChange = (value) => {
        setBrand(value);
    };
    const handleTypeChange = (value) => {
        setType(value);
    };
    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (<div style={{
            marginLeft: '72px',
            marginRight: '72px',
        }}>
      <material_1.Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#000' }}>
        Product List
      </material_1.Typography>
      <material_1.Grid container spacing={2} justifyContent="center">
        <material_1.Grid item xs={12} sm={12} md={12}>
          <SortComponent_1.default sort={sort} onSortChange={handleSortChange} brand={brand} onBrandChange={handleBrandChange} type={type} onTypeChange={handleTypeChange} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice}/>
        </material_1.Grid>
      </material_1.Grid>
      <material_1.Grid container spacing={4} sx={{ mt: 2 }} justifyContent="center">
        {products.map((product) => (<material_1.Grid item key={product.id}>
            <ProductCard_1.default product={product} onClick={() => handleProductClick(product.id)}/>
          </material_1.Grid>))}
      </material_1.Grid>
      <material_1.Pagination count={Math.ceil(totalProducts / pageSize)} page={page} onChange={handlePageChange} sx={{
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
        }}/>
    </div>);
};
exports.default = ProductList;
//# sourceMappingURL=ProductList.js.map