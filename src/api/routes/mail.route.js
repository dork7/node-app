const express = require("express");
const { sendMail, getEmailsById } = require("../controllers/mail/mail.controller");

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */
router.route("/:emailId").get(getEmailsById);

router.route("/").post(sendMail);


module.exports = router;
