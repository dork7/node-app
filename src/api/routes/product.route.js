const express = require('express');
const {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProducts,
  searchProducts,
} = require('../controllers/product/product.controller');
const passport = require('passport');
const jwtPass = require('../../config/passport')(passport);
const router = express.Router();
const { authorize } = require('../middlewares/auth.middleware');
const { cachingMiddleWare } = require('../middlewares/caching');

/**
 * @APIDesc - Get a User by userId
 */

router.route('/').get(cachingMiddleWare,getAllProducts);
// router.use(authorize);
router.route('/protected').get(authorize,getAllProducts);
// router
//   .route("/")
//   .get(passport.authenticate("jwt", { session: false }), getAllProducts);

router.route('/').post(addProduct);

router.route('/:productId').get(cachingMiddleWare, getProductById);

router.route('/:productId').put(updateProduct);

router.route('/:productId').delete(deleteProducts);

router.route('/search/:productId').get(searchProducts);

module.exports = router;
