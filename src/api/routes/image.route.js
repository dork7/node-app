const express = require("express");
const { uploadImage, deleteImage } = require("../controllers/image.controller");
const multerUpload = require("../utils/multer");
const router = express.Router();

/**
 * @APIDesc -
 */

router.route("/").post(multerUpload.array("image"), uploadImage);

router.route("/").delete(deleteImage);

module.exports = router;
