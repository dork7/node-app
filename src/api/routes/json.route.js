const express = require("express");
const { storeData, getDataById, getAllData, deleteAll } = require("../controllers/json/json.controller");

const router = express.Router();

/**
 * @APIDesc -
 */

router.route("/").post(storeData);

router.route('/:dataId').get(getDataById);

router.route('/').get(getAllData);

router.route('/').delete(deleteAll);

module.exports = router;
