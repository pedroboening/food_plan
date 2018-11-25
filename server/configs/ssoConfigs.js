module.exports = {
  clientID: process.env.SSO_CLIENT_ID,
  clientSecret: process.env.SSO_CLIENT_SECRET,
  authorizationURL: process.env.SSO_AUTHORIZATION_URL,
  tokenEndpointUrl: process.env.SSO_TOKEN_URL,
  tokenURL: process.env.SSO_TOKEN_URL,
  issuer: process.env.SSO_ISSUER_ID,
  skipUserProfile: true,
  scope: process.env.SSO_SCOPE,
  response_type: 'code',
  addCACert: process.env.SSO_ADDCACERT,
  CACertPathList: process.env.SSO_CACERTPATHLIST.split(','),
  callbackURL: process.env.SSO_CALLBACK_URL,
};
