const express = require("express");
const { storeData, getDataById, getAllData, deleteAll } = require("../controllers/json/json.controller");
const { cachingMiddleWare } = require("../middlewares/caching");
const { askAI } = require("../controllers/ai");

const router = express.Router();

/**
 * @APIDesc -
 */

router.route("/").post(askAI);
 
// router.route('/').get(getAllData);

module.exports = router;
