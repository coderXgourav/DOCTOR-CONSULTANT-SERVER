const UserModel = require("../../models/users");
const BlacklistModel = require("../../models/blacklistToken");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email_username, password } = req.body;
  if (!email_username || !password) {
    return res.status(400).json({
      status: false,
      message: "Missing Credentials",
      desc: "Email/username and password are required",
    });
  }

  try {
    const user = await UserModel.findOne({
      $or: [{ email_address: email_username }, { username: email_username }],
    });

    if (user != null) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const token = jwt.sign(
          { user },
          process.env.SECRET_KEY,
          (error, token) => {
            if (!error) {
              return res.status(200).json({
                status: true,
                message: "Login Success",
                desc: "Welcome back! You are successfully logged in.",
                token,
              });
            } else {
              return res.status(500).json({
                status: false,
                message: "Error generating token",
                desc: "sorry token not generated",
              });
            }
          }
        );
      } else {
        return res.status(401).json({
          status: false,
          message: "Invalid Password",
          desc: "Your password is incorrect. Please check and try again.",
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: "Incorrect Email and Username!",
        desc: "The email or username you entered doesn't match our records.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Error!",
      desc: "Sorry, something went wrong!",
    });
  }
};

const logout = async (req, res) => {
  const token = req?.user?.token;
  try {
    const tokenBlacklist = new BlacklistModel({
      token: token,
    });
    await tokenBlacklist.save();
    return res
      .status(200)
      .json({ status: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Internal Error!" });
  }
};

const checkTocken = (req, res) => {
  return res
    .status(200)
    .json({ status: true, message: "valid token", desc: "" });
};

const logoutFn = async (req, res) => {
  const token = req?.token;
  try {
    await BlacklistModel.create({
      token: token,
    });
    return res.status(200).json({
      status: true,
      message: "Logout Successfull",
      desc: " You have been logged out",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Error!",
      desc: "Please try again later",
    });
  }
};

module.exports = { login, logout, checkTocken, logoutFn };