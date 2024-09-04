"use strict";
const { hash } = require("../helper/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Dog, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "user name required",
          },
          notEmpty: {
            msg: "user name required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "email required",
          },
          notEmpty: {
            msg: "email required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email has already been taken",
        },
        validate: {
          notNull: {
            msg: "password required",
          },
          notEmpty: {
            msg: "password required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((el) => {
    el.password = hash(el.password);
  });
  return User;
};
