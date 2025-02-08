"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const material_1 = require("@mui/material");
const BookmarkBorder_1 = tslib_1.__importDefault(require("@mui/icons-material/BookmarkBorder")); // 保存图标
const react_redux_1 = require("react-redux");
const cartSlice_1 = require("../../components/store/cartSlice");
const CartItem = ({ item }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const handleRemoveItem = async (productId) => {
        try {
            await dispatch((0, cartSlice_1.removeFromCart)(productId)).unwrap();
        }
        catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };
    return (<material_1.Box sx={{ width: '746px', mb: 2 }}>
      {/* 商品内容区域 */}
      <material_1.Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center', // 保持顶部对齐
            mb: 3,
        }}>
        {/* 左侧：商品图片和信息 */}
        <material_1.Box sx={{ display: 'flex', alignItems: 'center' }}>
          <material_1.Box component="img" src={item.image} alt={item.name} sx={{
            width: '150px',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '8px',
            mr: 3,
        }}/>
          <material_1.Box>
            <material_1.Typography variant="h6">{item.name}</material_1.Typography>
            <material_1.Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Condition: Excellent
            </material_1.Typography>
            <material_1.Typography variant="body2" sx={{ mt: 1 }}>
              ${item.price} x {item.quantity}
            </material_1.Typography>
          </material_1.Box>
        </material_1.Box>

        {/* 右侧：价格与操作按钮 */}
        <material_1.Box sx={{
            textAlign: 'right',
            minWidth: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        }}>
          <material_1.Typography variant="h6" sx={{ fontWeight: 'bold', mb: 'auto' }}>
            ${item.price}
          </material_1.Typography>

          {/* 保存和删除按钮 */}
          <material_1.Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            mt: 'auto',
        }}>
            <material_1.Button variant="text" startIcon={<BookmarkBorder_1.default />} sx={{ color: '#000', textTransform: 'none' }}>
              Save for later
            </material_1.Button>
            <material_1.Button variant="text" startIcon={<img src="/images/ShoppingCart/delete.svg" alt="Delete Icon" style={{ width: '20px', height: '20px' }}/>} sx={{ color: 'black', textTransform: 'none' }} // 设置删除按钮样式
     onClick={() => handleRemoveItem(item.productId)}>
              Remove
            </material_1.Button>
          </material_1.Box>
        </material_1.Box>
      </material_1.Box>

      {/* 分隔线 */}
      <material_1.Divider sx={{ mt: 2 }}/>
    </material_1.Box>);
};
exports.default = CartItem;
//# sourceMappingURL=CartItem.js.map