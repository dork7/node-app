const { success, error, info } = require("consola");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/vars");
let refreshTokens = []; // store refresh token in db
exports.generateAccessToken = async (req, res, next) => {
  try {
    const username = req.body.username;
    const accessToken = generateToken(username);
    const refreshToken = jwt.sign({ userName: username }, jwtSecret);
    refreshTokens.push(refreshToken);
    info({ message: accessToken, refreshToken });
    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return next(error);
  }
};

const generateToken = (user) => {
  return jwt.sign({ username: user }, jwtSecret);
  // return jwt.sign({ username: user }, jwtSecret, {
  //   expiresIn: "60s",
  // });
};

exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    console.log("refreshToken", refreshToken);
    console.log("refreshTokens", refreshTokens);
    console.log(
      "refreshTokens.findIndex((item) => item === refreshToken) > 0",
      refreshTokens.findIndex((item) => item === refreshToken) > -1
    );
    if (refreshTokens.findIndex((item) => item === refreshToken) > -1) {
      const decoded = jwt.verify(refreshToken, jwtSecret);

      const accessToken = generateToken(decoded.username);

      return res.status(200).json({
        success: true,
        accessToken,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Invalid refresh Token",
    });
  } catch (error) {
    return next(error);
  }
};
exports.deleteRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    refreshTokens = refreshTokens.filter((item) => item !== refreshToken);
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Deleted Refresh Token",
    });
  } catch (error) {
    return next(error);
  }
};
