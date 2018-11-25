(() => {
  require('dotenv')
    .config({
      silent: true,
    });

  const appEnv = require('cfenv')
    .getAppEnv();
  const LOCAL_HTTPS = process.env.LOCAL_HTTPS === 'true';
  process.isLocal = (/localhost/.test(appEnv.bind) || appEnv.isLocal) && !LOCAL_HTTPS;
  const fs = require('fs');
  const appPort = process.env.APP_PORT || process.env.VCAP_APP_PORT || 3000;
  const express = require('express');
  const favicon = require('serve-favicon');
  const app = express();
  app.use(favicon('./favicon.png'));
  let server;
  if (process.env.LOCAL_HTTPS === 'true') {
    server = require('https')
      .createServer({
        hostname: 'localhost',
        agent: false,
        key: fs.readFileSync('./root/certificates/local/localhost-privkey.pem'),
        cert: fs.readFileSync('./root/certificates/local/localhost-cert.pem'),
        rejectUnauthorized: false,
      }, app);
  } else {
    server = require('http')
      .createServer(app);
  }

  const helmet = require('helmet');
  const passport = require('passport');
  const cookieSession = require('cookie-session');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const compress = require('compression');
  const morgan = require('morgan');

  app.use(helmet());
  app.use((req, res, next) => {
    res.cookie('JSESSIONID', '');
    return next();
  });
  app.use(compress());
  app.use(cookieParser());
  app.use(cookieSession({
    secret: process.env.APP_SECRET,
    maxAge: 24 * 60 * 60 * 1000,
    saveUninitialized: false,
    resave: false,
    name: 'jsessionid',
    key: 'jsessionid',
    cookie: {
      secure: true,
      httpOnly: true,
    },
  }));

  // app.use(passport.initialize());
  // app.use(passport.session());
  app.use(bodyParser.json({
    limit: '50mb',
  }));
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb',
  }));

  if (process.isLocal || process.env.DEBUG) {
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  }

  server.listen(appPort, () => {
    console.info(['Server running on port:', appPort, '\n'].join(' '));
    // require('./server/helpers/passport')(passport);
    require('./server/routes/index')(app, passport);
  });
})();
