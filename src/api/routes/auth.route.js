const express = require('express');
const {
  register,
  login,
  refreshJwtToken,
  logout,
} = require('../controllers/auth.controller');

const router = express.Router();

/**
 * @APIDesc -
 */

router.route('/login').post(login);

router.route('/register').post(register);

router.route('/refresh-token').get(refreshJwtToken);

router.route('/logout').get(logout);

module.exports = router;
