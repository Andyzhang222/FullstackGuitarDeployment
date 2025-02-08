"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const customStyles_1 = require("../../theme/customStyles");
const HomePageProductCard = ({ product, onClick, }) => {
    return (<material_1.Card sx={{
            width: '240px',
            height: '336px',
            borderRadius: '8px',
            mb: 2,
            overflow: 'hidden',
            cursor: 'pointer',
        }} 
    // 当用户点击卡片时，触发onClick事件，并将product和randomImage传递给父组件
    onClick={() => onClick(product)}>
      <material_1.CardMedia component="img" height="240px" width="240px" image={`${process.env.PUBLIC_URL}/${product.image}`} // 使用绝对路径显示图片
     alt={product.name} sx={{
            borderRadius: '8px 8px 8px 8px',
        }}/>
      <material_1.CardContent sx={{ padding: '0px', marginTop: '8px' }}>
        <customStyles_1.BodyText style={{
            marginBottom: '0.5rem',
            whiteSpace: 'nowrap', // 强制文本在一行显示
            overflow: 'hidden', // 隐藏溢出部分
            textOverflow: 'ellipsis', // 用省略号替换溢出的文本
            color: 'black',
        }}>
          {product.name} {/* 显示产品名称 */}
        </customStyles_1.BodyText>
        <customStyles_1.BodyText style={{ color: '#595959', marginTop: '2px' }}>
          Quantity: {product.quantity} {/* 显示产品数量 */}
          {product.inStock ? 'In Stock' : 'Out of Stock'} {/* 显示库存状态 */}
        </customStyles_1.BodyText>
        <customStyles_1.PriceTag style={{ marginTop: '4px' }}>
          ${product.price} {/* 显示产品价格 */}
        </customStyles_1.PriceTag>
      </material_1.CardContent>
    </material_1.Card>);
};
exports.default = HomePageProductCard;
//# sourceMappingURL=HomePageProductCard.js.map