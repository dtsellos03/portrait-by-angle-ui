var keys = require('../keyz.js');

var _ = require('lodash');
var CSV = require('csv-string');
var athena = require("athena-client");
var fs = require('fs');
const { Client } = require('pg');

let clientConfig = {
  bucketUri: 's3://rawstuff/',
  baseRetryWait: 0,
  retryWaitMax: 0
};

let awsConfig = {
  region: 'us-west-2',
  accessKeyId: keys.service,
  secretAccessKey: keys.secret
};

let athenaClient = athena.createClient(clientConfig, awsConfig);

const pgClient = new Client({
  host: 'localhost',
  port: 5432,
  user: 'nodeuser',
  password: keys.pgPs,
  database: 'reference-angle'
});

pgClient.connect();

function executeQuery() {
  return function(query, callback) {
    try {
      pgClient.query(query, (err, res) => {
        if (err) {
            console.log(err);
          query = query.replace('reference', `"images"."analyzed_images"`);
          return athenaClient.execute(query, (athenaErr, data) => {
            console.log(athenaErr);
            callback(null, _.get(data, 'records', []));
          })
        } else {
          return callback(null, res.rows);
        }
      })
    } catch (e) {
      query = query.replace('reference', `"images"."analyzed_images"`);
      return athenaClient.execute(query, (err, data) => {
        callback(null, _.get(data, 'records', []));
      })
    }
  }
}

module.exports = executeQuery();
