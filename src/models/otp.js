"use strict";
const { Model } = require("sequelize");

const {Enums} = require('../utils/common')
const genders = Enums.genders;

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
        autoIncrement: true
      },
      otp: {
        type: DataTypes.INTEGER(6),
        allowNull: false,
      },
      creation_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      expiration_time: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal(`CURRENT_TIMESTAMP + INTERVAL 1 MINUTE`),
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },    
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Otp",
      tableName: "otp",
      timestamps: false,
    }
  );
  return UserDetail;
};
