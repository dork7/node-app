const path = require("path");

// import .env variables
require("dotenv-safe").config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
  sample: path.join(__dirname, "../../.env.example"),
  allowEmptyValues: true,
});

console.log(`"process.env.NODE_ENV"`, process.env.NODE_ENV);

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri:
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI,
  },
  nodemailerEmail: process.env.NODEMAILER_EMAIL,
  emailClientID: process.env.CLIENT_ID,
  emailClientSecret: process.env.CLIENT_SECRET,
  emailRefreshToken: process.env.REFRESH_TOKEN,
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryConfig: {
    cloud_name: process.env.CLOUDNAIRY_NAME,
    api_key: process.env.CLOUDNAIRY_KEY,
    api_secret: process.env.CLOUDNAIRY_SECRET,
  },

  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
};
