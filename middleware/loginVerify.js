const jwt = require("jsonwebtoken");
const BlacklistModel = require("../models/blacklistToken");

const loginVerify = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Access denied. No token provided.",
      desc: "Please login properly!",
    });
  } else {
    try {
      const checkBlackListToken = await BlacklistModel.findOne({
        token: token,
      });
      if (checkBlackListToken) {
        return res.status(400).json({
          status: false,
          message: "Token Blacklisted",
          desc: "Please login properly!",
        });
      }
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY,
        (error, userDecode) => {
          if (!error) {
            req.user = userDecode;
            req.token = token;
            next();
          } else {
            return res.status(500).json({
              status: false,
              message: "token decoded failed !",
              desc: "Technical Issue! Please try again later",
            });
          }
        }
      );
      next();
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "Invalid token.",
        desc: "Technical Issue! Please try again later",
      });
    }
  }
};

module.exports = loginVerify;
