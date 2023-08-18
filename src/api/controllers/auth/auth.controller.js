const { success, error, info } = require('consola');
const { sendMail } = require('../../services/emailProvider');
const User = require('../../models/user.model');
const APIError = require('../../utils/APIError');
const httpStatus = require('http-status');

exports.login = async (req, res, next) => {
  try {
    // user authentication
    const userData = req.body;
    console.log('userData', userData);
    const { email, accessToken, refreshToken } = await User.authenticateUser(
      userData,
      next
    );
    res.cookie('jwtRefresh', refreshToken, {
      httpOnly: true,
      // sameSite: 'none',
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      email,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log('error', error);
    return next(error);
  }
};
exports.register = async (req, res, next) => {
  try {
    // user registration
    console.log('req.body', req.body);
    const userDetails = req.body;
    const newUser = new User({
      ...userDetails,
      isEmailConfirmed: false,
      // password: password,
      // role: userDetails.role,
    });

    newUser.save(async (error, user) => {
      if (error) {
        console.log('error :>> ', error);
        if (error.name === 'MongoError' && error.code === 11000) {
          // return "email must be unique";
          const apiError = new APIError({
            message: 'Email already registered',
            status: httpStatus.CONFLICT,
          });
          return next(apiError);
        } else {
          const apiError = new APIError({
            message: error.message ?? 'Some thing went wrong',
            status: httpStatus.CONFLICT,
          });
          return next(apiError);
        }
      }

      const emailVerificationObj = await User.generateEmailVerificationToken(
        user
      );
      user.emailVerification = emailVerificationObj;

      //  TODO: send mail
      // await sendEmailVerificationInstructions(emailVerificationObj);
      // TODO: send OTP
      const { email } = user;

      return res.status(200).json({
        success: true,
        message: 'Registered',
        email,
      });
    });
  } catch (error) {
    return next(error);
  }
};

exports.refreshJwtToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwtRefresh) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'No jwt cookie',
      });
    }
    const refreshToken = cookies.jwtRefresh;
    const accessToken = await User.authenticateRefreshToken(refreshToken);

    res.send({ accessToken });
  } catch (error) {
    return next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwtRefresh) {
      throw new APIError({
        // status: httpStatus.NO_CONTENT,
        message: 'Cookie not found so do nothing xD',
      });
    }
    const refreshToken = cookies.jwt;
    const loggedOut = await User.logout(refreshToken);
    res.clearCookie('jwt', { httpOnly: true });
    res.send({ loggedOut });
  } catch (error) {
    return next(error);
  }
};