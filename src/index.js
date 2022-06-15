// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const { success, error } = require('consola');
const fileUpload = require('express-fileupload');

// open mongoose connection
mongoose.connect();

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// listen to requests
app.listen(port, () =>
  success({ message: `server started on port ${port} (${env})` })
);

/**
 * Exports express
 * @public
 */
module.exports = app;
