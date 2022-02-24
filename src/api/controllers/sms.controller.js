const { success, error, info } = require("consola");
const logger = require("../../config/logger");
exports.sendSMS = async (req, res, next) => {
  try {
    logger.info(`Sending Message ${req.body.phoneNumber}`);
    return res.status(200).json({
      success: true,
      message: "Find some free sms service and integrate it xD",
    });
  } catch (error) {
    return next(error);
  }
};
