const express = require("express");
const {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
} = require("../controllers/product.controller");

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */

router.route("/").get(getAllProducts);

router.route("/").post(addProduct);

router.route("/:productId").get(getProductById);

router.route("/:productId").put(updateProduct);

module.exports = router;
