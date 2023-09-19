const express = require("express");
const { uploadImage, deleteImage, getImages, deleteImagesByUserId } = require("../controllers/image/image.controller");
const multerUpload = require("../utils/multer");
const router = express.Router();

/**
 * @APIDesc -
 */

router.route("/").post(multerUpload.array("image"), uploadImage);

router.route("/").delete(deleteImage);

router.route("/:userId").delete(deleteImagesByUserId);

router.route("/:userId").get(getImages);

module.exports = router;
