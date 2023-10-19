'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRoles.init({
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    role : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
  }, {
    sequelize,
    modelName: 'UserRoles',
    tableName: 'roles',
    timestamps: false
  });
  return UserRoles;
};