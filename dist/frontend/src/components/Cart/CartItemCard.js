"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const cartSlice_1 = require("../../components/store/cartSlice");
const Add_1 = tslib_1.__importDefault(require("@mui/icons-material/Add"));
const Remove_1 = tslib_1.__importDefault(require("@mui/icons-material/Remove"));
const Delete_1 = tslib_1.__importDefault(require("@mui/icons-material/Delete"));
const CartItemCard = ({ productId, name, image, price, quantity, }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [availableQuantity, setAvailableQuantity] = (0, react_1.useState)(null); // 单独管理此商品的可用库存
    // 当组件加载时检查当前商品的库存
    (0, react_1.useEffect)(() => {
        const checkItemStock = async () => {
            try {
                const response = await dispatch((0, cartSlice_1.checkStock)()).unwrap();
                const stockResult = response.find((item) => item.productId === productId);
                if (stockResult) {
                    setAvailableQuantity(stockResult.availableQuantity);
                }
            }
            catch (error) {
                console.error('Error checking stock:', error);
            }
        };
        checkItemStock();
    }, [dispatch, productId]);
    // 完全删除购物车项
    const handleRemoveItem = () => {
        dispatch((0, cartSlice_1.removeFromCart)(productId))
            .unwrap()
            .then(() => dispatch((0, cartSlice_1.fetchCartItems)()))
            .catch((error) => {
            console.error('Failed to remove item from cart:', error);
        });
    };
    // 删除整个商品
    const handleRemoveEntireItem = () => {
        dispatch((0, cartSlice_1.removeEntireCartItem)(productId))
            .unwrap()
            .then(() => dispatch((0, cartSlice_1.fetchCartItems)()))
            .catch((error) => {
            console.error('Failed to remove item from cart:', error);
        });
    };
    // 增加数量
    const handleIncrementQuantity = async () => {
        if (availableQuantity !== null && quantity < availableQuantity) {
            try {
                await dispatch((0, cartSlice_1.addToCart)({ productId, quantity: 1 })).unwrap();
                dispatch((0, cartSlice_1.fetchCartItems)());
            }
            catch (error) {
                console.error('Error adding item to cart:', error);
            }
        }
        else {
            console.log('Cannot add more items, stock is limited');
        }
    };
    // 减少数量
    const handleDecrementQuantity = () => {
        if (quantity > 1) {
            dispatch((0, cartSlice_1.removeFromCart)(productId))
                .unwrap()
                .then(() => dispatch((0, cartSlice_1.fetchCartItems)()))
                .catch((error) => {
                console.error('Failed to decrement item quantity:', error);
            });
        }
        else {
            handleRemoveItem(); // 如果数量为1，直接删除该项
        }
    };
    const imagePath = image
        ? image.startsWith('/')
            ? image
            : `/${image}`
        : '/default-image-path.jpg';
    return (<material_1.Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            borderRadius: 2,
            p: 2,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
        }}>
      <img src={imagePath} alt={name} style={{
            width: '60px',
            height: '60px',
            marginRight: '10px',
            borderRadius: '10px',
            objectFit: 'cover',
        }}/>
      <material_1.Box sx={{ flexGrow: 1, maxWidth: '150px' }}>
        <material_1.Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {name}
        </material_1.Typography>
        <material_1.Typography variant="body2" sx={{ color: 'gray' }}>
          ${price}
        </material_1.Typography>
        <material_1.Typography variant="body2" sx={{ color: 'gray' }}>
          x {quantity}
        </material_1.Typography>
        {/* 只有当用户数量超过库存时才显示库存不足的警告 */}
        {availableQuantity !== null && quantity > availableQuantity && (<material_1.Typography color="error">
            Only {availableQuantity} in stock
          </material_1.Typography>)}
      </material_1.Box>
      <material_1.Box sx={{ display: 'flex', alignItems: 'center', minWidth: '110px' }}>
        <material_1.IconButton onClick={handleDecrementQuantity} sx={{
            backgroundColor: '#f0f0f0',
            '&:hover': { backgroundColor: '#e0e0e0' },
            '&.Mui-disabled': { backgroundColor: '#f0f0f0' },
            borderRadius: '50%',
            padding: '6px',
            marginRight: '8px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        }}>
          <Remove_1.default fontSize="small"/>
        </material_1.IconButton>
        <material_1.Typography variant="h6" sx={{ mx: 1 }}>
          {quantity}
        </material_1.Typography>
        <material_1.IconButton onClick={handleIncrementQuantity} disabled={availableQuantity !== null && quantity >= availableQuantity} sx={{
            backgroundColor: '#f0f0f0',
            '&:hover': { backgroundColor: '#e0e0e0' },
            '&.Mui-disabled': {
                backgroundColor: '#f0f0f0',
                color: '#b0b0b0',
                boxShadow: 'none',
            },
            borderRadius: '50%',
            padding: '6px',
            marginLeft: '8px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        }}>
          <Add_1.default fontSize="small"/>
        </material_1.IconButton>
      </material_1.Box>
      {/* 确保垃圾箱按钮始终可点击 */}
      <material_1.IconButton sx={{
            color: 'black',
            '&:hover': {
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
            },
            width: '50px',
            minWidth: '50px',
            marginLeft: '10px',
            borderRadius: '5px',
        }} onClick={handleRemoveEntireItem} // 删除整个商品
    >
        <Delete_1.default />
      </material_1.IconButton>
    </material_1.Box>);
};
exports.default = CartItemCard;
//# sourceMappingURL=CartItemCard.js.map