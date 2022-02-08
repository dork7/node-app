const { success, error, info } = require("consola");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/vars");
exports.sendToken = async (req, res, next) => {
  try {
    const username = req.body.username;
    const accessToken = jwt.sign(username, jwtSecret);
    info({ message: accessToken });
    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return next(error);
  }
};
