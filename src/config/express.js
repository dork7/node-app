const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');

const routes = require('../api/routes');
const { logs } = require('./vars');
// const strategies = require("./passport");
const error = require('../api/middlewares/error');
const corsOptions = require('./corsOptions');
const credentials = require('../api/middlewares/credentials');
// const passportSetup = require("../config/passport");
// const { jwtSecret } = require("../config/vars");

/**
 * Express instance
 * @public
 */
const app = express();

// request logging. dev: console | production: file
// app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS headers
// app.use(credentials);

// gzip compression
// app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === 'production' ? undefined : false,
  })
);

// Parse Incoming Cookies
app.use(cookieParser());

// enable CORS - Cross Origin Resource Sharing
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
// app.use(cors(corsOptions));

// enable authentication
app.use(passport.initialize());
// passport.use("jwt", strategies.jwt);
// passport.use("facebook", strategies.facebook);
// passport.use("apple", strategies.apple);
// passport.use("google", strategies.google);

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
