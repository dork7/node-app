const httpStatus = require('http-status');
const { success, error, info } = require('consola');
const { jwtSecret } = require('../../config/vars');
const APIError = require('../utils/APIError');
const jwt = require('jsonwebtoken');

exports.authorize = async (req, res, next) => {
  const authHeader = req.header('authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return next(
      new APIError({
        message: 'No user token found',
        status: httpStatus.NOT_FOUND,
      })
    );

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
  } catch (err) {
    return next(
      new APIError({
        message: 'Invalid Token',
        status: httpStatus.UNAUTHORIZED,
      })
    );
  }
  next();
};
