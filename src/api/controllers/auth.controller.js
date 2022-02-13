const { success, error, info } = require("consola");
const { sendMail } = require("../services/emailProvider");
const User = require("../models/user.model");
const APIError = require("../utils/APIError");
const httpStatus = require("http-status");

exports.login = async (req, res, next) => {
  try {
    // user authentication
    const userData = req.body;
    const user = await User.authenticateUser(userData);
    res.status(200).json({
      success: true,
      ...user,
      // isMatched,
    });
  } catch (error) {
    return next(error);
  }
};
exports.register = async (req, res, next) => {
  try {
    // user registration
    console.log("req.body", req.body);
    const userDetails = req.body;
    const newUser = new User({
      ...userDetails,
      isEmailConfirmed: false,
      // password: password,
      // role: userDetails.role,
    });

    await newUser.save(async (error, user) => {
      if (error) {
        if (error.name === "MongoError" && error.code === 11000) {
          // return "email must be unique";
          const apiError = new APIError({
            message: "Email already registered",
            status: httpStatus.CONFLICT,
          });
          return next(apiError);
        } else {
          return error;
        }
      }

      const emailVerificationObj = await User.generateEmailVerificationToken(
        user
      );
      user.emailVerification = emailVerificationObj;

      //  TODO: send mail
      // await sendEmailVerificationInstructions(emailVerificationObj);
      // TODO: send OTP
      return res.status(200).json({
        success: true,
        message: "Registered",
        user,
      });
    });
  } catch (error) {
    return next(error);
  }
};
