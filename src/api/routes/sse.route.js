const express = require("express");
const {
  pushEvent,
  getClientEvent,
  getAllClients,
} = require("../controllers/sse.controller");

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */
router.route("/client-list").get(getAllClients);

router.route("/:clientId").post(pushEvent);

router.route("/:clientId").get(getClientEvent);

// router.route("/").get(getAllEvent);

module.exports = router;
