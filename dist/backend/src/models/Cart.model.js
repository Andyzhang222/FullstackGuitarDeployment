"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
// Cart.model.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const CartItem_model_1 = require("./CartItem.model");
class Cart extends sequelize_1.Model {
}
exports.Cart = Cart;
Cart.init({
    cartId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    addedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: "Carts",
});
// 定义关联关系
Cart.hasMany(CartItem_model_1.CartItem, { foreignKey: "cartId", as: "CartItems" });
CartItem_model_1.CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "Cart" });
//# sourceMappingURL=Cart.model.js.map