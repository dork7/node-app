const express = require("express");
const { storeData, getDataById, getAllData, deleteAll } = require("../controllers/json/json.controller");
const { cachingMiddleWare } = require("../middlewares/caching");

const router = express.Router();

/**
 * @APIDesc -
 */

router.route("/").post(storeData);

router.route('/:dataId').get(getDataById);

router.route('/').get(cachingMiddleWare ,getAllData);

router.route('/').delete(deleteAll);

module.exports = router;
