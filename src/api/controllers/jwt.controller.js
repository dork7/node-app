const { success, error, info } = require("consola");
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
  return jwt.sign({ username: user }, jwtSecret, {
    expiresIn: "60s",
  });
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
      message: "Invalide refresh TOken",
    });
  } catch (error) {
    return next(error);
  }
};
