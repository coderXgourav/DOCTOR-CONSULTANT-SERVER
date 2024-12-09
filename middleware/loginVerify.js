const jwt = require("jsonwebtoken");
const BlacklistModel = require("../models/blacklistToken");

const loginVerify = async (req, res, next) => {
  try {
    // Ensure the Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: false,
        message: "Access denied. No token provided.",
        desc: "Please login properly!",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Access denied. No token provided.",
        desc: "Please login properly!",
      });
    }

    // Check if the token is blacklisted
    const checkBlackListToken = await BlacklistModel.findOne({ token });
    if (checkBlackListToken) {
      return res.status(400).json({
        status: false,
        message: "Token Blacklisted",
        desc: "Please login properly!",
      });
    }

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (error, userDecode) => {
      if (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({
          status: false,
          message: "Invalid or expired token.",
          desc: "Please login again.",
        });
      }

      // Log the decoded user information
      console.log("Decoded token information:", userDecode);

      // Attach user data and token to the request object
      req.user = userDecode;
      req.token = token;

      next();
    });
  } catch (error) {
    console.error("Error during token verification:", error.message);
    return res.status(500).json({
      status: false,
      message: "An internal error occurred.",
      desc: "Technical Issue! Please try again later",
    });
  }
};

module.exports = loginVerify;
