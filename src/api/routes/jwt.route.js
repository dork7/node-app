const express = require("express");
const {
  refreshToken,
  generateAccessToken,
} = require("../controllers/jwt.controller");

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */

router.route("/").post(generateAccessToken);

router.route("/refresh-token").post(refreshToken);

module.exports = router;
