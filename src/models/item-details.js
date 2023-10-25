"use strict";
const { Model } = require("sequelize");

const {Enums} = require('../utils/common')

module.exports = (sequelize, DataTypes) => {
    class ItemDetail extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
        this.belongsTo(models.User, { foreignKey: "id" });
      }
    }

    ItemDetail.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            item_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            item_image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            item_price: {
                type: DataTypes.DECIMAL,
                allowNull:false,
            },
            mgf_Date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            exp_Date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            stock: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            rating: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            item_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },

        },
        {
            sequelize,
            modelName: "ItemDetails",
            tableName: "item_details",
            timestamps: false,
        }

    );
    return ItemDetail;
}