// const path = require("path");

// // import .env variables
// require("dotenv-safe").config({
//   path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
//   sample: path.join(__dirname, "../../.env.example"),
//   allowEmptyValues: true,
// });

// console.log(`"process.env.NODE_ENV"`, process.env.NODE_ENV);

module.exports = {
  env: 'development',
  port: '4000',
  mongo: {
    uri: 'mongodb+srv://dork7:vUe9WHLa0TiQCcjJ@mcluster.7kxtv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  },
  nodemailerEmail: 'hamzameh122@gmail.com',
  emailClientID:
    '54373532434-84m1asb2tpqms80co7ne6bsganuj2ju0.apps.googleusercontent.com',
  emailClientSecret: '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',
  emailRefreshToken:
    '1//04KPfXasTtnrJCgYIARAAGAQSNwF-L9IrT-l2VVw5HXHoS8tuR7Vu7gqy1Ne-A_h43FeqVwcW16sBJtRyc2e5BwEHaX9pGdJIi34',
  jwtSecret: 'mySecretKey',
  cloudinaryConfig: {
    cloud_name: 'djppupdjs',
    api_key: '118759718176498',
    api_secret: 'kYqtB9cbWE33iryoB5z-KkacuoQ',
  },

  redisHost: '127.0.0.1',
  redisPort: '6379',
};
// module.exports = {
//   env: process.env.NODE_ENV,
//   port: process.env.PORT,
//   mongo: {
//     uri:
//       process.env.NODE_ENV === "test"
//         ? process.env.MONGO_URI_TESTS
//         : process.env.MONGO_URI,
//   },
//   nodemailerEmail: process.env.NODEMAILER_EMAIL,
//   emailClientID: process.env.CLIENT_ID,
//   emailClientSecret: process.env.CLIENT_SECRET,
//   emailRefreshToken: process.env.REFRESH_TOKEN,
//   jwtSecret: process.env.JWT_SECRET,
//   cloudinaryConfig: {
//     cloud_name: process.env.CLOUDNAIRY_NAME,
//     api_key: process.env.CLOUDNAIRY_KEY,
//     api_secret: process.env.CLOUDNAIRY_SECRET,
//   },

//   redisHost: process.env.REDIS_HOST,
//   redisPort: process.env.REDIS_PORT,
// };
