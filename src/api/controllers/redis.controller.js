const { success, error, info } = require("consola");
const { isValidObjectId } = require("mongoose");
const redis = require("redis");
const { redisHost, redisPort } = require("../../config/vars");

const CONF = {
  db: 5,
  host: redisHost,
  port: redisPort,
};

const redisClient = redis.createClient(CONF);
// redisClient.on("error", (err) => console.log("Redis Client Error", err));
(async () => {
  await redisClient.connect();
})();

exports.storeData = async (req, res, next) => {
  try {
    const key = req.params.key;
    const value = req.body;
    redisClient.set(key, JSON.stringify(value));
    redisClient.expire(key, 5);
    res.json({ message: "Value set", key });
  } catch (error) {
    return next(error);
  }
};
exports.getData = async (req, res, next) => {
  try {
    const key = req.params.key;
    console.log("key", key);
    const val = await redisClient.get(key);
    res.json(JSON.parse(val));
  } catch (error) {
    return next(error);
  }
};
