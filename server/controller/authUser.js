// const { where } = require("sequelize");
const { User } = require("../models/index");
const { signToken } = require("../helper/jwt");
const { compare } = require("../helper/bcrypt");
const { OAuth2Client } = require("google-auth-library");

class AuthUser {
  static async Register(req, res, next) {
    try {
      const { userName, email, password } = req.body;
      await User.create({ userName, email, password });

      res.status(201).json({
        message: "success register",
      });
    } catch (error) {
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

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      // console.log(token);

      const client = new OAuth2Client();

      const tiket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
      });

      const payload = tiket.getPayload();
      const { email } = payload;

      const [user, created] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          userName: email,
          email: email,
          password: "password_google",
        },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
        userName: user.userName,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthUser;
