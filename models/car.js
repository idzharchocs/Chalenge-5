'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models)  {
      // define association here
      Car.belongsTo(models.User, {
        foreignKey: {
          name: "createdBy",
        },
        as: "carsCreator",
      });

      Car.belongsTo(models.User, {
        foreignKey: {
          name: "updatedBy",
        },
        as: "carsUpdater",
      });

      Car.belongsTo(models.User, {
        foreignKey: {
          name: "deletedBy",
        },
        as: "carsDeleter",
      });
    }
  }
  Car.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category: DataTypes.STRING,
    imageUrl: {
      type: DataTypes.TEXT,
      defaultValue:
        "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
    },
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedBy: DataTypes.INTEGER,
  },{
    sequelize,
    modelName: 'Car',
  });
  return Car;
};