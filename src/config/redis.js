const redis = require("redis");
const { redisHost, redisPort } = require("../config/vars");

const CONF = {
  db: 5,
  host: redisHost,
  port: redisPort,
};

exports.redisClient = redis.createClient(CONF);
// redisClient.on("error", (err) => console.log("Redis Client Error", err));
// (async () => {
//   await redisClient.connect();
// })();