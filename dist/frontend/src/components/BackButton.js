"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const ProductBreadcrumbs = ({ category }) => {
    const { id } = (0, react_router_dom_1.useParams)();
    const location = (0, react_router_dom_1.useLocation)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    // 判断是否在搜索页面
    const isSearchPage = location.pathname.includes('/search');
    return (<material_1.Breadcrumbs aria-label="breadcrumb" sx={{
            mt: 2,
            mb: 2,
            ml: 7.2,
            mr: 7.2,
            padding: '8px 16px',
            backgroundColor: '#f5f5f5', // 添加背景颜色
            borderRadius: '8px', // 添加圆角
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // 添加阴影
        }}>
      <material_1.Link underline="hover" color="inherit" href="/" sx={{
            color: '#02000C', // 蓝色链接
            fontWeight: 'bold', // 加粗
            '&:hover': {
                color: '#02000C', // 深蓝色悬停效果
            },
        }}>
        Home
      </material_1.Link>
      {isSearchPage ? (<material_1.Link underline="hover" color="inherit" sx={{
                color: '#02000C',
                cursor: 'pointer',
                fontWeight: 'bold',
                '&:hover': {
                    color: '#0056b3',
                },
            }} onClick={() => navigate('/search')}>
          Searching Page
        </material_1.Link>) : (<material_1.Typography color="textPrimary" sx={{
                color: '#02000C',
                fontWeight: 'bold',
            }}>
          {category}
        </material_1.Typography>)}
      {!isSearchPage && id && (<material_1.Typography color="textPrimary" sx={{
                fontWeight: 'bold',
                color: '#6c757d', // 灰色，用于显示当前页面
            }}>
          Guitar Inventory ID: {id}
        </material_1.Typography>)}
    </material_1.Breadcrumbs>);
};
exports.default = ProductBreadcrumbs;
//# sourceMappingURL=BackButton.js.map