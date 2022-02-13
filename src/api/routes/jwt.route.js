const express = require("express");
const {
  refreshToken,
  generateAccessToken,
  deleteRefreshToken,
} = require("../controllers/jwt.controller");

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */

router.route("/").post(generateAccessToken);

router.route("/refresh-token").post(refreshToken);

router.route("/delete-refresh-token").delete(deleteRefreshToken);

module.exports = router;
