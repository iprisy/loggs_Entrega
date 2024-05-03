const passport = require ('passport');
const jwt = require ('passport-jwt');
const {SECRET_JWT} = require ('../utils/jwt');

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use (
    'jwt',
    new JWTStrategy (
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken (),
        secretOrKey: SECRET_JWT,
      },
      async (jwpPayload, done) => {
        console.log ('🚀 ~ async ~ jwpPayload:', jwpPayload);
        try {
          return done (null, jwpPayload);
        } catch (error) {
          console.log ('🚀 ~ async ~ error:', error);
          return done (error);
        }
      }
    )
  );
};

module.exports = initializePassport;
