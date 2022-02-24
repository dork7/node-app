const express = require("express");
const { sendSMS } = require("../controllers/sms.controller");

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */

router.route("/").post(sendSMS);

module.exports = router;
