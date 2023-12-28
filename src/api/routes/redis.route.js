const express = require("express");
const { getData, storeData, publishData } = require("../controllers/redis.controller");

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */

router.route("/publish").post(publishData);

router.route("/:key").post(storeData);


router.route("/:key").get(getData);

router.route("*").all((req, res) => {
  try {
    res.send("Redis is shut for maintenance");
  } catch (error) {
    res.send("error");
  }
});

module.exports = router;
