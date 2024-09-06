const { verifiedToken } = require("../helper/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw { name: `Unauthorized` };
    }

    const access_token = authorization.split(" ")[1];

    const payload = verifiedToken(access_token);
    // console.log(payload);

    req.loginInfo = {
      id: payload.id,
      userName: payload.userName,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
