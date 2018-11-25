// const auditDB = "NAME";
// const cloudant = require('../helpers/cloudant')(auditDB);

module.exports = (dbName) => {
  // eslint-disable-next-line global-require
  const cloudant = require('../configs/cloudant')(dbName);
  return {
    load: () => (
      new Promise((resolve, reject) => cloudant.list({ include_docs: true }, (error, data) => {
        if (!error) {
          resolve(data);
        } else {
          reject(error);
        }
      }))
    ),
    list: () => (
      new Promise((resolve, reject) => {
        cloudant.list((error, data) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      })
    ),
    get: dataInput => (
      new Promise((resolve, reject) => {
        cloudant.get(dataInput, (error, data) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      })
    ),
    fetchMultipleDocuments: dataInput => (
      new Promise((resolve, reject) => {
        cloudant.fetch({ keys: dataInput }, { include_docs: false }, (error, data) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      })
    ),
    find: dataInput => (
      new Promise((resolve, reject) => {
        cloudant.find(dataInput, (error, data) => {
          if (!error) {
            resolve(data.docs);
          } else {
            reject(error);
          }
        });
      })
    ),
    create: dataInput => (
      new Promise((resolve, reject) => {
        cloudant.insert(dataInput, (error, data) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      })
    ),
    bulk: dataInput => (
      new Promise((resolve, reject) => {
        cloudant.bulk({ docs: dataInput }, (error, data) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      })
    ),
    update: dataInput => (
      new Promise((resolve, reject) => {
        cloudant.insert(dataInput, (error, data) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      })
    ),
    exclude: dataInput => (
      new Promise((resolve, reject) => {
        const { _id: id, _rev: rev } = dataInput;
        cloudant.destroy(id, rev, (error, data) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      })
    ),
    view: dataInput => (
      new Promise((resolve, reject) => {
        const { designName, viewName, options } = dataInput;
        cloudant.view(designName, viewName, options, (error, data) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      })
    ),
    create_view: (view, designName) => (
      new Promise((resolve, reject) => {
        cloudant.insert(view, designName, (error, data) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      })
    ),
    insert_attachment: dataInput => (
      new Promise((resolve, reject) => {
        const {
          _id: id,
          _rev: rev,
          name,
          data,
          content_type: contentType,
        } = dataInput;
        cloudant.attachment.insert(id, name, data, contentType, rev, (error, response) => {
          if (!error) {
            resolve(response);
          } else {
            reject(error);
          }
        });
      })
    ),
    get_attachments: dataInput => (
      new Promise((resolve, reject) => {
        const { _id: id, name } = dataInput;
        cloudant.attachment.get(id, name, (error, data) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      })
    ),
    destroy_attachments: dataInput => (
      new Promise((resolve, reject) => {
        const { _id: id, name, _rev: rev } = dataInput;
        cloudant.attachment.destroy(id, name, rev, (error, data) => {
          if (!error) {
            resolve(data);
          } else {
            reject(error);
          }
        });
      })
    ),
  };
};
