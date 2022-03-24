const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { jwtSecret } = require("./vars");

module.exports = function (passport) {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      function (jwt_payload, cb) {
        console.log("jwt_payload", jwt_payload);
        // you can check user from database here
        // in case of error
        // cb("User not present", false);

        cb(null, true);
      }
    )
  );
};
