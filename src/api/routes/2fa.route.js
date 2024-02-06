const express = require('express');
const {
    verifyToken, generateQRCode
} = require('../controllers/2fa/2fa.controller');
const { checkIfRedisOnline } = require('../middlewares/redis.middleware');

const router = express.Router();

/**
 * @APIDesc -
 */

router.route('/verifyToken').post(checkIfRedisOnline, verifyToken);
router.route('/generateQRCode').get(checkIfRedisOnline, generateQRCode);

module.exports = router;
