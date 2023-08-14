const { success, error, info } = require("consola");
const { sendMail } = require("../services/emailProvider");

exports.sendMail = async (req, res, next) => {
  try {
    const mailRes = await sendMail({
      email: req.body.email,
      subject: req.body.subject ?? '',
      mailBody: req.body.mailBody,
    });
    info({ message: mailRes });
    return res.status(200).json({
      success: true,
      mailRes,
    });
  } catch (error) {
    return next(error);
  }
};
