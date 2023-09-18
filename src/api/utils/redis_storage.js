const { redisClient } = require("../../config/redis");
const { redisExpTime } = require("../../config/vars");


const cacheMap = {}
exports.setCacheData = async (key, data) => {
  try {
    if (redisClient?.isReady) {
      redisClient.set(key, data);
      redisClient.expire(key, redisExpTime);
      return true
    }
    cacheMap[key] = data
    return true;
  } catch (error) {
    return error
  }
};
exports.getCachedData = async (key) => {
  try {
    if (redisClient?.isReady) {
      const val = await redisClient.get(key);
       return JSON.parse(val)
    }
    return cacheMap[key]
  } catch (error) {
    return error
  }
};
