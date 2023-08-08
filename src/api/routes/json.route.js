const express = require("express");
const { storeData, getDataById } = require("../controllers/json.controller");

const router = express.Router();

/**
 * @APIDesc -
 */

router.route("/").post(storeData);

router.route('/').get(getDataById);

module.exports = router;
