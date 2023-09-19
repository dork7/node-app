const httpStatus = require('http-status');
const { success, error, info } = require('consola');
const { jwtSecret } = require('../../config/vars');
const APIError = require('../utils/APIError');
const jwt = require('jsonwebtoken');
const { redisClient } = require('../../config/redis');
const { setCacheData, getCachedData } = require('../utils/cacheHandler');

exports.cachingMiddleWare = async (req, res, next) => {
    try {
        let isCached = false
        // if no connection
        const cachedResp = await getCachedData(req.originalUrl);
        if (cachedResp) {
            res.setHeader('isCached', true);
            // res.setHeader('content-type', 'application/json');
            console.log(res)
            return res.status(200).send(cachedResp);
        }

        const originalSend = res.send;

        // // Overriding the send function to capture response data
        res.send = function (data) {
            // You can capture or modify 'data' here before sending the response
            // console.log('Captured response data:', data);
            const dataCached = setCacheData(req.originalUrl, data)
            if (!isCached) {
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
