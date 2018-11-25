const cloudantClient = require('nano');

const cloudantCredentials = JSON.parse(process.env.CLOUDANT);
const cloudant = cloudantClient(cloudantCredentials);

module.exports = (databaseName) => {
  let databaseNameToUse;
  let database = null;
  if (!databaseName) {
    databaseNameToUse = process.env.DATABASE_NAME;
  } else {
    databaseNameToUse = databaseName;
  }

  function createDB(dbName) {
    return new Promise((resolve, reject) => {
      cloudant.db.create(dbName, (error, response) => {
        if (error) {
          if (error.reason === 'The database could not be created, the file already exists.') {
            console.info(`Database ${dbName} already exists.`);
            resolve(dbName);
          } else {
            console.info(`Some error occurred while creating the database ${dbName}. Reason: ${error.reason}`);
            reject(error);
          }
        } else {
          console.info(`Database ${dbName} has been created. DB Response: ${JSON.stringify(response)}`);
          resolve(dbName);
        }
      });
    });
  }

  function getDBInfo(db) {
    return new Promise((resolve, reject) => {
      db.info((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async function setDatabase(dbName) {
    try {
      database = cloudant.use(dbName);
      await getDBInfo(database);
    } catch (e) {
      database = cloudant.use(await createDB(dbName));
    }
  }

  setDatabase(databaseNameToUse);
  return database;
};
