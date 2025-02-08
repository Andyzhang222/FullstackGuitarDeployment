"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// components/ProductDetailComponents/ProductImages.tsx
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const ProductImage = ({ image, alt, isMain, isViewAll }) => (<material_1.Box sx={{
        position: 'relative',
        width: isMain ? '614px' : '110px',
        height: isMain ? '614px' : '110px',
        borderRadius: isMain ? '8px 0px 0px 0px' : '8px',
        border: isMain ? 'none' : '1px solid #02000C',
        backgroundColor: '#EFEFEF',
        cursor: isMain ? 'default' : 'pointer',
        marginBottom: isMain ? 0 : '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isViewAll ? 0.3 : 1, // 调整最后一个缩略图的透明度
    }}>
    <img src={image.startsWith('/') ? image : '/' + image} alt={alt} style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: isMain ? '8px 0px 0px 0px' : '8px',
    }}/>
    {isViewAll && (<material_1.Typography variant="h6" component="div" sx={{
            position: 'absolute',
            color: '#000',
            fontWeight: 'bold',
            textAlign: 'center',
        }}>
        View All
      </material_1.Typography>)}
  </material_1.Box>);
const ProductImages = ({ image, alt }) => {
    const thumbnails = new Array(5).fill(image); // 使用主图作为所有缩略图
    return (<material_1.Box sx={{ display: 'flex' }}>
      <material_1.Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '24px', // 确保与主图有间距
        }}>
        {thumbnails.slice(0, 4).map((thumb, index) => (<ProductImage key={index} image={thumb} alt={alt}/>))}
        {/* 添加一个额外的 Box 组件以包含 "View All" 缩略图 */}
        <ProductImage image={image} alt="View All" isViewAll/>
      </material_1.Box>
      <ProductImage image={image} alt={alt} isMain/>
    </material_1.Box>);
};
exports.default = ProductImages;
//# sourceMappingURL=ProductImages.js.map