const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const env = {};

const APP_PORT = () => new Promise((resolve, reject) => {
  rl.question('On which port your application will run? (9443) ', (answer) => {
    env.APP_PORT = answer ? Number(answer) : 9443;
    resolve();
  });
});

const ENVIRONMENT = () => new Promise((resolve, reject) => {
  rl.question('What environment is it? (DEV) ', (answer) => {
    env.ENVIRONMENT = answer || 'DEV';
    resolve();
  });
});

const APP_SECRET = () => new Promise((resolve, reject) => {
  rl.question('Secret key to session: (1BD2DA42C6ED3CD581692B1D5B15F) ', (answer) => {
    env.APP_SECRET = answer || '1BD2DA42C6ED3CD581692B1D5B15F';
    resolve();
  });
});

const DATABASE_NAME = () => new Promise((resolve, reject) => {
  rl.question('Database name: (topaccounts-db) ', (answer) => {
    env.DATABASE_NAME = answer || 'topaccounts-db';
    resolve();
  });
});

const AUDIT_DATABASE_NAME = () => new Promise((resolve, reject) => {
  rl.question('Audit database name: (audit-topaccounts-db) ', (answer) => {
    env.AUDIT_DATABASE_NAME = answer || 'audit-topaccounts-db';
    resolve();
  });
});

const CLOUDANT = () => new Promise((resolve, reject) => {
  rl.question('Cloudant credentials: ', (answer) => {
    env.CLOUDANT = answer;
    resolve();
  });
});

const USER_GROUP = () => new Promise((resolve, reject) => {
  rl.question('User Blue Group: (LATOP_USER_DEV) ', (answer) => {
    env.USER_GROUP = answer || 'LATOP_USER_DEV';
    resolve();
  });
});

const ADMIN_GROUP = () => new Promise((resolve, reject) => {
  rl.question('Admin Blue Group : (LATOP_ADMIN_DEV) ', (answer) => {
    env.ADMIN_GROUP = answer || 'LATOP_ADMIN_DEV';
    resolve();
  });
});

const SSO_CLIENT_ID = () => new Promise((resolve, reject) => {
  rl.question('SSO Client ID: ', (answer) => {
    env.SSO_CLIENT_ID = answer;
    resolve();
  });
});

const SSO_CLIENT_SECRET = () => new Promise((resolve, reject) => {
  rl.question('SSO Client Secret: ', (answer) => {
    env.SSO_CLIENT_SECRET = answer;
    resolve();
  });
});

const SSO_AUTHORIZATION_URL = () => new Promise((resolve, reject) => {
  rl.question('SSO Authorization URL: (https://w3id.alpha.sso.ibm.com/isam/oidc/endpoint/amapp-runtime-oidcidp/authorize) ', (answer) => {
    env.SSO_AUTHORIZATION_URL = answer || 'https://w3id.alpha.sso.ibm.com/isam/oidc/endpoint/amapp-runtime-oidcidp/authorize';
    resolve();
  });
});

const SSO_TOKEN_URL = () => new Promise((resolve, reject) => {
  rl.question('SSO Token URL: (https://w3id.alpha.sso.ibm.com/isam/oidc/endpoint/amapp-runtime-oidcidp/token) ', (answer) => {
    env.SSO_TOKEN_URL = answer || 'https://w3id.alpha.sso.ibm.com/isam/oidc/endpoint/amapp-runtime-oidcidp/token';
    resolve();
  });
});

const SSO_ISSUER_ID = () => new Promise((resolve, reject) => {
  rl.question('SSO Issuer URL: (https://w3id.alpha.sso.ibm.com/isam) ', (answer) => {
    env.SSO_ISSUER_ID = answer || 'https://w3id.alpha.sso.ibm.com/isam';
    resolve();
  });
});

const SSO_SCOPE = () => new Promise((resolve, reject) => {
  rl.question('SSO Scope: (openid) ', (answer) => {
    env.SSO_SCOPE = answer || 'openid';
    resolve();
  });
});

const SSO_ADDCACERT = () => new Promise((resolve, reject) => {
  rl.question('Add Certificate? (true) ', (answer) => {
    env.SSO_ADDCACERT = answer || true;
    resolve();
  });
});

const SSO_CACERTPATHLIST = () => new Promise((resolve, reject) => {
  rl.question('Certificate path: (Default) ', (answer) => {
    env.SSO_CACERTPATHLIST = answer || '/root/certificates/blueid-intermediate.crt,/root/certificates/blueid-root.crt,/root/certificates/blueid-server.crt,/root/certificates/blueidSSL.pem,/root/certificates/idaas.iam.ibm.com.pem,/root/certificates/idaas.toronto.ca.ibm.com.cer,/root/certificates/oidc_w3id_staging.cer,/root/certificates/prepiam.toronto.ca.ibm.com.pem,/root/certificates/symantec.pem,/root/certificates/verisign-root-ca.pem,/root/certificates/local/localhost-cert.pem,/root/certificates/local/localhost-privkey.pem';
    resolve();
  });
});

const SSO_CALLBACK_URL = () => new Promise((resolve, reject) => {
  rl.question('SSO Callback: (/auth/sso/callback) ', (answer) => {
    env.SSO_CALLBACK_URL = answer || '/auth/sso/callback';
    resolve();
  });
});

const LOCAL_HTTPS = () => new Promise((resolve, reject) => {
  rl.question('Local Https? (true) ', (answer) => {
    env.LOCAL_HTTPS = answer || true;
    resolve();
  });
});

const DEBUG = () => new Promise((resolve, reject) => {
  rl.question('Debug log? (true) ', (answer) => {
    env.DEBUG = answer || true;
    resolve();
  });
});

const main = async () => {
  await APP_PORT();
  await ENVIRONMENT();
  await APP_SECRET();
  await DATABASE_NAME();
  await AUDIT_DATABASE_NAME();
  await CLOUDANT();
  await USER_GROUP();
  await ADMIN_GROUP();
  await SSO_CLIENT_ID();
  await SSO_CLIENT_SECRET();
  await SSO_AUTHORIZATION_URL();
  await SSO_TOKEN_URL();
  await SSO_ISSUER_ID();
  await SSO_SCOPE();
  await SSO_ADDCACERT();
  await SSO_CACERTPATHLIST();
  await SSO_CALLBACK_URL();
  await LOCAL_HTTPS();
  await DEBUG();

  let string = '';
  for (const prop in env) {
    if (Object.prototype.hasOwnProperty.call(env, prop)) {
      const element = env[prop];
      string = string.concat(`${prop} = "${element}"\n`);
    }
  }

  const path = '.ENV';
  const buffer = new Buffer(string);
  fs.open(path, 'w', (err, fd) => {
    if (err) {
      throw `could not open file: ${err}`;
    }
    fs.write(fd, buffer, 0, buffer.length, null, (err) => {
      if (err) throw `error writing file: ${err}`;
      fs.close(fd, () => {
        console.log('wrote the file successfully');
      });
    });
  });
  rl.close();
};

main();
