const express = require("express");
const { sendMail } = require("../controllers/mail/mail.controller");

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */

router.route("/").post(sendMail);

module.exports = router;
