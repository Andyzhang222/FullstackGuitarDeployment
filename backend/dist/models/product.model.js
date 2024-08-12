"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeProduct = exports.Product = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
const initializeProduct = (sequelizeInstance) => {
    console.log('Initializing Product model...');
    Product.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
        },
        inStock: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
        },
        brand: {
            type: sequelize_1.DataTypes.STRING,
        },
        category: {
            type: sequelize_1.DataTypes.STRING,
        },
        sku: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
        type: {
            type: sequelize_1.DataTypes.STRING,
        },
        rating: {
            type: sequelize_1.DataTypes.DECIMAL(2, 1),
        },
        reviews_count: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        tableName: 'Products',
        sequelize: sequelizeInstance,
    });
    console.log('Product model initialized');
    return Product;
};
exports.initializeProduct = initializeProduct;
initializeProduct(database_1.sequelize);
//# sourceMappingURL=product.model.js.map