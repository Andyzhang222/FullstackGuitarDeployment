"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartProvider = exports.useCart = void 0;
const tslib_1 = require("tslib");
// src/context/CartContext.tsx
const react_1 = tslib_1.__importStar(require("react"));
const CartContext = (0, react_1.createContext)(undefined);
const useCart = () => {
    const context = (0, react_1.useContext)(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
exports.useCart = useCart;
const CartProvider = ({ children, }) => {
    const [cartItems, setCartItems] = (0, react_1.useState)(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });
    return (<CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>);
};
exports.CartProvider = CartProvider;
//# sourceMappingURL=CartContext.js.map