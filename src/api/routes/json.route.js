const express = require("express");
const { storeData, getDataById, getAllData } = require("../controllers/json.controller");

const router = express.Router();

/**
 * @APIDesc -
 */

router.route("/").post(storeData);

router.route('/:dataId').get(getDataById);

router.route('/').get(getAllData);

module.exports = router;
