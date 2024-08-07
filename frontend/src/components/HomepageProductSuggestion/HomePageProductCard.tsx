import React from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import { Product } from '../../types/types';
import { BodyText, PriceTag } from '../../theme/customStyles';

//set the api
interface HomePageProductCardProps {
  product: Product;
  onClick: (product: Product) => void; // 修改 onClick 函数签名
}

const HomePageProductCard: React.FC<HomePageProductCardProps> = ({
  product,
  onClick,
}) => {
  return (
    <Card
      sx={{
        width: '240px',
        height: '336px',
        borderRadius: '8px',
        mb: 2,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      // 当用户点击卡片时，触发onClick事件，并将product和randomImage传递给父组件
      onClick={() => onClick(product)}
    >
      <CardMedia
        component="img"
        height="240px"
        width="240px"
        image={product.image} // 显示随机选择的图片
        alt={product.name}
        sx={{
          borderRadius: '8px 8px 8px 8px',
        }}
      />
      <CardContent sx={{ padding: '0px', marginTop: '8px' }}>
        <BodyText
          style={{
            marginBottom: '0.5rem',
            whiteSpace: 'nowrap', // 强制文本在一行显示
            overflow: 'hidden', // 隐藏溢出部分
            textOverflow: 'ellipsis', // 用省略号替换溢出的文本
            color: 'black',
          }}
        >
          {product.name} {/* 显示产品名称 */}
        </BodyText>
        <BodyText style={{ color: '#595959', marginTop: '2px' }}>
          Quantity: {product.quantity} {/* 显示产品数量 */}
          {product.inStock ? 'In Stock' : 'Out of Stock'} {/* 显示库存状态 */}
        </BodyText>
        <PriceTag style={{ marginTop: '4px' }}>
          ${product.price} {/* 显示产品价格 */}
        </PriceTag>
      </CardContent>
    </Card>
  );
};

export default HomePageProductCard;
