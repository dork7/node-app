const httpStatus = require('http-status');
const { success, error, info } = require('consola');
const { jwtSecret } = require('../../config/vars');
const APIError = require('../utils/APIError');
const jwt = require('jsonwebtoken');

exports.cachingMiddleWare = async (req, res, next) => {
    try {



    } catch (err) {
        return next(
            new APIError({
                message: `Issue with cache middleware`,
                status: httpStatus.UNAUTHORIZED,
            })
        );
    }
    next();
};
