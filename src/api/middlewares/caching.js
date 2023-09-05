const httpStatus = require('http-status');
const { success, error, info } = require('consola');
const { jwtSecret } = require('../../config/vars');
const APIError = require('../utils/APIError');
const jwt = require('jsonwebtoken');
const { redisClient } = require('../../config/redis');
const { storeDataRedis, getDataRedis } = require('../utils/redis_storage');

exports.cachingMiddleWare = async (req, res, next) => {
    try {
        let isCached = false
        // if no connection
        if (redisClient.isOpen) {            
            const redisResp = await getDataRedis(req.originalUrl)
            if (redisResp) {
                  const { success, count } =  (redisResp)
                 if (count > 0 && success) {
                    res.setHeader('isCached', true)
                    return res.status(200).send(redisResp);
                }
            }
        }


        const originalSend = res.send;

        // // Overriding the send function to capture response data
        res.send = function (data) {
            // You can capture or modify 'data' here before sending the response
            console.log('Captured response data:', data);
            const dataStored = storeDataRedis(req.originalUrl, data)
            if (!isCached) 
            {
                res.setHeader('isCached', false)
                originalSend.call(this, data);
            }
        };
        next()
    } catch (err) {
        return next(
            new APIError({
                message: `Issue with cache middleware - ${err}`,
                status: httpStatus.SERVICE_UNAVAILABLE,
            })
        );
    }
};
