"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  UserDetail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mobile_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          enum: ["male", "female"],
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserDetail",
      tableName: "user_detail",
      timestamps: false,
    }
  );
  return UserDetail;
};
