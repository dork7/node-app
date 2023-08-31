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

        if (redisClient.isOpen) {
            // return res.status(200).send("Redis is not operational");
            console.log('req', req.baseUrl, redisClient.isOpen)

            const redisResp = await getDataRedis(req.baseUrl)
            if (redisResp) {
                const { success, count, data } = redisResp
                if (count > 0 && success) {
                    return res.status(200).send("data");
                }
            }
        }

        // const originalSend = res.send;
        const originalSend = res.send;

        // Overriding the send function to capture response data
        // res.send = function (data) {
        //     // You can capture or modify 'data' here before sending the response
        //     console.log('Captured response data:', data);
        //     const dataStored = storeDataRedis(req.baseUrl, data)

        //     // Call the original send function with the modified data
        //     originalSend.call(this, data);
        // };

        // next()
        //  res.json = (body) => {
        //     console.log("getting data from db")
        //     const dataStored = storeDataRedis(req.baseUrl, body)
        //     // return res.send();
        //     // next()

        // };



    } catch (err) {
        return next(
            new APIError({
                message: `Issue with cache middleware - ${err}`,
                status: httpStatus.SERVICE_UNAVAILABLE,
            })
        );
    }
};
