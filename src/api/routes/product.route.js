const express = require("express");
const {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
} = require("../controllers/product.controller");
const passport = require("passport");
const jwtPass = require("../../config/passport")(passport);
const router = express.Router();
const { authorize } = require("../middlewares/auth.middleware");

/**
 * @APIDesc - Get a User by userId
 */

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), getAllProducts);

router.route("/").post(addProduct);

router.route("/:productId").get(getProductById);

router.route("/:productId").put(updateProduct);

module.exports = router;
