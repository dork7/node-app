const express = require('express');
const {
    verifyToken,generateQRCode
} = require('../controllers/2fa/2fa.controller');

const router = express.Router();

/**
 * @APIDesc -
 */

router.route('/verifyToken').post(verifyToken);
router.route('/generateQRCode').get(generateQRCode);

module.exports = router;
