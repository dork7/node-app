const express = require('express');
const { longPooling } = require('../controllers/longPooling.controller');

const router = express.Router();

/**
 * @APIDesc - Get a User by userId
 */

router.route('/').get(longPooling);

module.exports = router;
