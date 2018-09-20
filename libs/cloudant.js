/* eslint-disable global-require */
function Cloudant({
  url,
}) {
  const nano = require('nano')(url);

  function get({
    query,
    database,
  }) {
    return new Promise((resolve, reject) => {
      nano.request({
        db: database,
        method: 'POST',
        doc: '_find',
        body: query,
      }, (error, body) => {
        if (error) {
          const errormsg = {
            status: error.statusCode,
            message: error.reason,
          };
          return reject(errormsg);
        }
        return resolve(body);
      });
    });
  }

  return Object.freeze({
    get,
  });
}

module.exports = Cloudant;
