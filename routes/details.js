const express = require('express');
const Cloudant = require('../libs/cloudant');

const router = express.Router();
const services = process.env.VCAP_SERVICES;
const servicesAsJSON = services ? JSON.parse(services) : '';

router.get('/details', (req, res, next) => {
  if (Object.prototype.hasOwnProperty.call(servicesAsJSON, 'cloudantNoSQLDB')) {
    const { url } = servicesAsJSON.cloudantNoSQLDB[0].credentials;
    const query = {
      selector: { _id: { $gt: 0 } },
      fields: [],
    };
    const cloudant = Cloudant({
      url,
    });
    const database = 'mydb';
    return cloudant.get({
      query,
      database,
    })
      .then(data => (res.send(data)));
  }
  return res.send('no cloudant connected');
});

module.exports = router;
