const express = require("express");
const { getData, storeData, publishData } = require("../controllers/redis.controller");
const { checkIfRedisOnline } = require("../middlewares/redis.middleware");

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */


// /**
//  * Middle ware
//  */
// const checkIfRedisOnline = (req, res, next) => {
//   try {
//     if (!redisClient?.isReady) throw new APIError({
//       message: "Redis offline",
//       errors: "Redis offline",
//       isPublic: false,
//     })
//     next()
//   } catch (err) {
//     next(err)
//   }
// }

router.route("/publish").post(checkIfRedisOnline, publishData);

router.route("/:key").post(checkIfRedisOnline, storeData);


router.route("/:key").get(checkIfRedisOnline, getData);

router.route("*").all((req, res) => {
  try {
    res.send("Redis is shut for maintenance");
  } catch (error) {
    res.send("error");
  }
});


module.exports = router;
