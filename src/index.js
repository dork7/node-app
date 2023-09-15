// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const { success, error } = require('consola');
const fileUpload = require('express-fileupload');
const color = require('colors');
const { redisClient } = require('./config/redis');

// open mongoose connection
mongoose.connect();

// connect to redis

if (process.env.NODE_ENV === "development.local") {
  redisClient.connect();
  redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
  });
}

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// listen to requests
app.listen(port, () =>
  success({ message: `server started on port ${port} (${env})` })
);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Perform cleanup or any necessary actions
  // process.exit(1); // Exit the application gracefully
});

/**
 * Exports express
 * @public
 */
module.exports = app;
