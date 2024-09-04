"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dog.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Dog.init(
    {
      name: DataTypes.STRING,
      breed: DataTypes.STRING,
      averangeAge: DataTypes.STRING,
      averangeWeight: DataTypes.STRING,
      description: DataTypes.TEXT,
      Image: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Dog",
    }
  );
  return Dog;
};
