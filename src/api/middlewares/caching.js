const httpStatus = require('http-status');
const { success, error, info } = require('consola');
const { jwtSecret } = require('../../config/vars');
const APIError = require('../utils/APIError');
const jwt = require('jsonwebtoken');
const { redisClient } = require('../../config/redis');
const { storeDataRedis, getDataRedis } = require('../utils/redis_storage');

exports.cachingMiddleWare = async (req, res, next) => {
    try {
        // if no connection
        console.log('req', req.baseUrl)

        if (redisClient.connected) {
            return res.status(200).send("Redis is not operational");
        }

        const data = await getDataRedis(req.baseUrl)
        console.log('data', data)

        res.json = (body) => {
            storeDataRedis(req.baseUrl, body)
        };
        
        next()


    } catch (err) {
         return next(
            new APIError({
                message: `Issue with cache middleware`,
                status: httpStatus.SERVICE_UNAVAILABLE,
                errors: err
            })
        );
    }
};
