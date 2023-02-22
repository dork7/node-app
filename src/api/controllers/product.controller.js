const mongoose = require('mongoose');
const Product = require('../models/product.model');
const { nanoid, customAlphabet } = require('nanoid');

/**
 * Load user and append to req.
 * @public
 */

const posts = [
  {
    userName: 'lol',
    title: 'post1',
  },
  {
    userName: 'apple',
    title: 'post2',
  },
];
exports.addProduct = async (req, res, next) => {
  try {
    const randomAlphaNumeric = customAlphabet('MAXPINE2002', 5);
    req.body.productId = randomAlphaNumeric();
    req.body.productOwner = req.user.userId;
    const product = await new Product(req.body).save();
    const productTransformed = product.transform();
    return res.status(200).json({
      product: productTransformed,
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
exports.getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const user = await Product.get(productId);
    const userTransformed = Product.transform();
    return res.status(200).json({
      user: userTransformed,
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const query = { _id: mongoose.Types.ObjectId(req.params.productId) };

    await Product.findOneAndUpdate(
      query,
      { ...req.body },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(500);
          return res.json({ msg: `Unexpected Error (AccMS): ${err}` });
        }

        return res.json(doc);
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const query = req.query;

    const products = await Product.list(query);
    return res.status(200).json({
      count: products.length,
      user: req.user,
      products: products,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
exports.deleteProducts = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    if (productId === 'all') {
      const products = await Product.deleteMany();
      return res.status(200).json({
        user: req.user,
        message: 'All product removed',
        products: products,
        success: true,
      });
    }
    const products = await Product.deleteOne({ productId: productId });
    return res.status(200).json({
      user: req.user,
      products: products,
      message: `${productId} is removed`,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

exports.searchProducts = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    fullTextSearch(req, res, next);
    // return res.status(200).json({ productId, success: true });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const fullTextSearch = async (req, res, next) => {
  try {
    const searchString = req.params;

    const result = await Product.find({
      $text: { $search: 'IP' },
    });
    console.log(result);
    return res.status(200).json({ result, success: true });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
