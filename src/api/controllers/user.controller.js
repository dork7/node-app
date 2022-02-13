const mongoose = require("mongoose");
const User = require("../models/user.model");

/**
 * Load user and append to req.
 * @public
 */

exports.createUser = async (req, res, next) => {
  try {
    const user = await new User(req.body).save();
    const userTransformed = user.transform();
    return res.status(200).json({
      user: userTransformed,
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.get(userId);
    const userTransformed = user.transform();
    return res.status(200).json({
      user: userTransformed,
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const query = { _id: mongoose.Types.ObjectId(req.params.userId) };

    await User.findOneAndUpdate(
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

exports.getAllUsers = async (req, res, next) => {
  try {
    const query = req.query;
    const users = await User.find(query);
    return res.status(200).json({
      users: users,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const query = req.body;
    const users = await User.deleteUser(query);
    return res.status(200).json({
      users: users,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};
