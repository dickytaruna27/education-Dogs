const { where } = require("sequelize");
const { User } = require("../models/index");
const { signToken } = require("../helper/jwt");
const { compare } = require("../helper/bcrypt");

class AuthUser {
  static async Register(req, res, next) {
    try {
      const { userName, email, password } = req.body;
      await User.create({ userName, email, password });

      res.status(201).json({
        message: "success register",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async Login(req, res, next) {
    try {
      const { userName, email, password } = req.body;
      if (!userName || !email || !password) throw { name: "InvalidLogin" };

      const loginUser = await User.findOne({
        where: {
          userName,
          email,
        },
      });
      if (!loginUser) throw { name: "LoginError" };
      if (!compare(password, loginUser.password)) throw { name: "LoginError" };

      const payload = {
        id: loginUser.id,
        email: loginUser.email,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        message: "Success login",
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthUser;
