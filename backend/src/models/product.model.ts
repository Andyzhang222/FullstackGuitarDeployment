import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/database';

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public image!: string;
  public inStock!: boolean;
  public brand!: string;
  public category!: string;
  public sku!: string;
  public quantity!: number;
  public type!: string;
  public rating!: number;
  public reviews_count!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const initializeProduct = (sequelizeInstance: Sequelize) => {
  console.log('Initializing Product model...');
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      inStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'Products',
      sequelize: sequelizeInstance,
    }
  );
  console.log('Product model initialized');
  return Product;
};

initializeProduct(sequelize);

export { Product, initializeProduct };