const { success, error, info } = require("consola");
const { sendMail } = require("../services/emailProvider");

exports.login = async (req, res, next) => {
  try {
    // user authentication

    info({ message: mailRes });
    return res.status(200).json({
      success: true,
      mailRes,
    });
  } catch (error) {
    return next(error);
  }
};
