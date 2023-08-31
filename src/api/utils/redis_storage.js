const { redisClient } = require("../../config/redis");
const { redisExpTime } = require("../../config/vars");

exports.storeDataRedis = async (key, data) => {
  try {
    redisClient.set(key, JSON.stringify(data));
    redisClient.expire(key,5);
    return true;
  } catch (error) {
    return error
  }
};
exports.getDataRedis = async (key) => {
  try {
    const val = await redisClient.get(key);
    console.log('val', val)
    return JSON.parse(val)
  } catch (error) {
    return error
  }
};
