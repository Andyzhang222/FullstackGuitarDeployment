"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const CategoryMenu = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleCategoryClick = (type) => {
        // 导航到 search 页面并传递 type 参数
        navigate(`/search?type=${type}`);
    };
    return (<material_1.Grid container sx={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            flexWrap: 'nowrap',
            width: '650px',
        }}>
      <material_1.Button sx={{
            color: '#000000',
            textTransform: 'none',
            minWidth: 'fit-content',
        }} onClick={() => handleCategoryClick('Classical')}>
        <material_1.Typography variant="body1">Classical Guitar</material_1.Typography>
      </material_1.Button>
      <material_1.Button sx={{
            color: '#000000',
            textTransform: 'none',
            minWidth: 'fit-content',
        }} onClick={() => handleCategoryClick('Acoustic')}>
        <material_1.Typography variant="body1">Acoustic Guitar</material_1.Typography>
      </material_1.Button>
      <material_1.Button sx={{
            color: '#000000',
            textTransform: 'none',
            minWidth: 'fit-content',
        }} onClick={() => handleCategoryClick('Digital')}>
        <material_1.Typography variant="body1">Digital Guitar</material_1.Typography>
      </material_1.Button>
      <material_1.Button sx={{
            color: '#000000',
            textTransform: 'none',
            minWidth: 'fit-content',
        }} onClick={() => handleCategoryClick('Electric')}>
        <material_1.Typography variant="body1">Electric Guitar</material_1.Typography>
      </material_1.Button>
    </material_1.Grid>);
};
exports.default = CategoryMenu;
//# sourceMappingURL=CategoryMenu.js.map