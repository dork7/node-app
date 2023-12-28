const { success, error, info } = require("consola");
const { redisClient, publisher } = require("../../config/redis");


exports.storeData = async (req, res, next) => {
  try {
    const key = req.params.key;
    const value = req.body;
    redisClient.set(key, JSON.stringify(value));
    redisClient.expire(key, 60);
    res.json({ message: "Value set", key });
  } catch (error) {
    return next(error);
  }
};
exports.getData = async (req, res, next) => {
  try {
    const key = req.params.key;
    const val = await redisClient.get(key);
    res.json(JSON.parse(val));
  } catch (error) {
    return next(error);
  }
};

exports.publishData = async (req, res, next) => {
  try {
     publisher.publish('PUBSUB_CHANNEL', JSON.stringify(req.body));
  } catch (error) {
    return next(error);
  }
};
