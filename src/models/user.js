"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");
const { ServerConfig } = require("../config");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.UserRoles, { foreignKey: "role_id" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
      timestamps: false,
    }
  );
  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = bcrypt.hashSync(user.password,+ServerConfig.SALT_ROUNDS);
    user.password = encryptedPassword;
  });
  User.beforeBulkUpdate(function encrypt(user) {
      const encryptedPassword = bcrypt.hashSync(user.attributes.password,+ServerConfig.SALT_ROUNDS);
      user.attributes.password = encryptedPassword;
  });
  return User;
};
