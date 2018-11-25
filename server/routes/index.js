const path = require('path');
const express = require('express');

module.exports = (app, passport) => {
  const ensureAccess = function (req, res, next) {
    // eslint-disable-next-line no-nested-ternary
    return req.isAuthenticated() || process.isLocal ? next() : (
      req.user
        ? res.status(403)
          .send({ reason: 'forbidden' })
        : res.redirect('/login'));
  };

  const ensureAdminAccess = function (req, res, next) {
    // eslint-disable-next-line no-nested-ternary
    return ((req.user && req.user.role === 'ADMIN') || process.isLocal) ? next() : (
      req.user
        ? res.status(403)
          .send({ reason: 'forbidden' })
        : res.redirect('/login'));
  };

  const api = express.Router();

  app.use('/api', api);

  // eslint-disable-next-line global-require
  require('./partials/loginHandler')(app, passport);

  app.use('/', ensureAccess, express.static(path.resolve('client', 'dist')));

  app.use((req, res) => res.status(404)
    .send({
      reason: 'notfound',
    }));
};
