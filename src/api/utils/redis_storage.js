const { redisClient } = require("../../config/redis");

exports.storeDataRedis = async (key, data) => {
  try {
    redisClient.set(key, JSON.stringify(value));
    // redisClient.expire(key, 15);
    return true;
  } catch (error) {
    return error
  }
};
exports.getDataRedis = async (key) => {
  try {
    const val = await redisClient.get(key);
    return val
  } catch (error) {
    return error
  }
};
