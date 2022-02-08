const express = require("express");
const { sendToken } = require("../controllers/jwt.controller");

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */

router.route("/").post(sendToken);

module.exports = router;
