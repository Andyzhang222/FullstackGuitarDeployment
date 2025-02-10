// Cart.model.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { CartItem } from "./CartItem.model";

class Cart extends Model {
  public cartId!: string;
  public userId!: string;
  public productId!: string;
  public quantity!: number;
  public price!: number;
  public addedAt!: Date;
}

Cart.init(
  {
    cartId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    addedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Carts",
  }
);

// 定义关联关系
Cart.hasMany(CartItem, { foreignKey: "cartId", as: "CartItems" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "Cart" });

export { Cart };
