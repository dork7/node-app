const httpStatus = require('http-status');
const { success, error, info } = require('consola');
const { jwtSecret } = require('../../config/vars');
const APIError = require('../utils/APIError');
const jwt = require('jsonwebtoken');
const { redisClient } = require('../../config/redis');
const { storeDataRedis, getDataRedis } = require('../utils/redis_storage');

/**
 * testing middle ware for experimentation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

exports.testingMiddleWare = async (req, res, next) => {
    try {
        console.log("before")
        next()
        // console.log("after")
    } catch (err) {
        return next(
            new APIError({
                message: `Issue with cache middleware - ${err}`,
                status: httpStatus.SERVICE_UNAVAILABLE,
            })
        );
    }
};
exports.testingMiddleWareAfter = async (req, res, next) => {
    try {
        // next()
        console.log("after")
    } catch (err) {
        // console.log('error', error)
        return next(
            new APIError({
                message: `Issue with cache middleware - ${err}`,
                status: httpStatus.SERVICE_UNAVAILABLE,
            })
        );
    }
};
