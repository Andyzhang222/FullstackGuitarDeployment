import { Model, DataTypes, ForeignKey } from "sequelize";
import { sequelize } from "../config/database";
import { Product } from "./product.model"; // 导入 Product 模型

class CartItem extends Model {
  public userId!: string;
  public productId!: string;
  public quantity!: number;
  public price!: number;

  // 添加关联
  public product?: Product;
}

CartItem.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "CartItems",
    timestamps: true,
  }
);

// 定义关联关系
CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

export { CartItem };