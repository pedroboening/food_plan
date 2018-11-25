module.exports = (app, passport) => {
  app.get('/login', passport.authenticate('openidconnect', {}));

  app.get('/auth/sso/callback', (req, res, next) => {
    const successRedirect = req.session.originalUrl || '/';
    passport.authenticate('openidconnect', {
      successRedirect,
      failureRedirect: '/unauthorized',
    })(req, res, next);
  });

  app.get('/unauthorized', (req, res) => {
    if (req.user) {
      return res.status(403)
        .send({
          reason: 'forbidden',
        });
    }
    return res.status(401)
      .send({
        reason: 'unauthorized',
      });
  });

  app.get('/notfound', (req, res) => res.status(404)
    .send({
      reason: 'notfound',
    }));

  app.get('/userInfo', (req, res) => res.status(200)
    .send(req.user));

  app.post('/logout', (req, res) => {
    res.clearCookie('connect.sid');
    req.logout();
    res.redirect(
      `https://w3id.sso.ibm.com/auth/sps/samlidp/saml20/sloinitial?RequestBinding=HTTPRedirect&PartnerId=${req.protocol}://${req.get('host')}&NameIdFormat=email`,
    );
  });

  app.get('/logout', (req, res) => {
    res.clearCookie('connect.sid');
    req.logout();
    res.redirect(
      `https://w3id.sso.ibm.com/auth/sps/samlidp/saml20/sloinitial?RequestBinding=HTTPRedirect&PartnerId=${req.protocol}://${req.get('host')}&NameIdFormat=email`,
    );
  });
};
