const express = require('express');
const {
  getUserById,
  updateProfile,
  getAllUsers,
  createUser,
  deleteUser,
} = require('../controllers/user.controller');
const { authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */

router.route('/').get(authorize, getAllUsers);

router.route('/').post(createUser);

router.route('/:userId').get(getUserById);

router.route('/:userId').put(updateProfile);

router.route('/').delete(deleteUser);

module.exports = router;
