const { redisClient } = require("../../config/redis");
const APIError = require("../utils/APIError");


/**
 * Middle ware
 */
exports.checkIfRedisOnline = (req, res, next) => {
  try {
    if (!redisClient?.isReady) throw new APIError({
      message: "Redis offline",
      errors: "Redis offline",
      isPublic: false,
    })
    next()
  } catch (err) {
    next(err)
  }
}
