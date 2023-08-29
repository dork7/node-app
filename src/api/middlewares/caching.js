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
            console.log('req', req.baseUrl,redisClient.isOpen)
            
            const redisResp = await getDataRedis(req.baseUrl)
            if (redisResp) {
                const { success, count, data } = redisResp
                if (count > 0 && success) {
                    return res.status(200).send(data);
                }
            }
        }

        next()
        // const originalSend = res.send;


        // res.json = (body) => {
        //     console.log("getting data from db",body)
        //     const dataStored = storeDataRedis(req.baseUrl, body)
        //     //  return res.send();
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
