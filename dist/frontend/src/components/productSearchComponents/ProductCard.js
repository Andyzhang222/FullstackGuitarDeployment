"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const customStyles_1 = require("../../theme/customStyles");
const ProductionCard = ({ product, onClick, }) => {
    return (<material_1.Card sx={{
            width: '240px',
            height: '336px',
            borderRadius: '8px',
            mb: 2,
            overflow: 'hidden',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            boxShadow: 'none',
        }} onClick={() => onClick(product)}>
      <material_1.CardMedia component="img" height="240px" width="240px" image={product.image} alt={product.name} sx={{
            borderRadius: '8px 8px 0 0',
        }}/>
      <material_1.CardContent sx={{
            padding: '0px',
            marginTop: '8px',
            textAlign: 'center', // 使所有内容居中
        }}>
        <customStyles_1.BodyText style={{
            marginBottom: '0.5rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: 'black',
        }}>
          {product.name}
        </customStyles_1.BodyText>
        <customStyles_1.BodyText style={{ color: '#595959', marginTop: '2px' }}>
          Quantity: {product.quantity}
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </customStyles_1.BodyText>
        <customStyles_1.PriceTag style={{
            marginTop: '4px',
            display: 'block',
            textAlign: 'center', // 居中显示价格
            fontWeight: 'bold',
        }}>
          ${product.price}
        </customStyles_1.PriceTag>
      </material_1.CardContent>
    </material_1.Card>);
};
exports.default = ProductionCard;
//# sourceMappingURL=ProductCard.js.map