'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    sku: {
      type: DataTypes.STRING,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
    },
    reviews_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {});

  return Product;
};