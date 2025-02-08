"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const product_model_1 = require("./product.model"); // 导入 Product 模型
class CartItem extends sequelize_1.Model {
}
exports.CartItem = CartItem;
CartItem.init({
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    productId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
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
}, {
    sequelize: database_1.sequelize,
    tableName: "CartItems",
    timestamps: true,
});
// 定义关联关系
CartItem.belongsTo(product_model_1.Product, { foreignKey: "productId", as: "product" });
//# sourceMappingURL=CartItem.model.js.map