const { verifiedToken } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw { name: `Unauthorized` };
    }

    const access_token = authorization.split(" ")[1];

    const payload = verifiedToken(access_token);

    const userVerfied = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!userVerfied) {
      throw { name: `Unauthorized` };
    }

    req.loginInfo = {
      userId: userVerfied.id,
      userName: userVerfied.userName,
      email: userVerfied.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
