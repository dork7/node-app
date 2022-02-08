const mongoose = require("mongoose");
const Product = require("../models/product.model");

/**
 * Load user and append to req.
 * @public
 */

const posts = [
  {
    userName: "lol",
    title: "post1",
  },
  {
    userName: "apple",
    title: "post2",
  },
];
exports.addProduct = async (req, res, next) => {
  try {
    const user = await new Product(req.body).save();
    const userTransformed = user.transform();
    return res.status(200).json({
      user: userTransformed,
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
    const products = await Product.find(query);
    return res.status(200).json({
      user: req.user,
      products: products,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
