/* eslint-disable no-underscore-dangle */
const OpenIDConnectStrategy = require('passport-idaas-openidconnect').IDaaSOIDCStrategy;
const ssoConfigs = require('../configs/ssoConfigs');

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((profile, done) => {
    done(null, profile);
  });

  passport.use('openidconnect',
    new OpenIDConnectStrategy(
      ssoConfigs,
      (iss, sub, profile, accessToken, refreshToken, params, done) => {
        process.nextTick(() => {
          const newProfile = {
            accessToken,
            refreshToken,
            name: profile,
          };
          done(null, newProfile);
        });
      },
    ));
};
