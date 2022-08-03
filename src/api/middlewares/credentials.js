const allowedOrigins = require('../../config/allowedOrigins');

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  console.log('origin ', origin);
  if (allowedOrigins.includes(origin)) {
    console.log('origin credentials', origin);

    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};
module.exports = credentials;
