"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {}
exports.User = User;
User.init(
  {
    sub: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    email: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users",
    sequelize: database_1.sequelize,
  }
);
//# sourceMappingURL=user.model.js.map
