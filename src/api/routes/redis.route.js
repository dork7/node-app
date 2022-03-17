const express = require("express");
const { getData, storeData } = require("../controllers/redis.controller");

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */

router.route("/:key").post(storeData);

router.route("/:key").get(getData);

module.exports = router;
