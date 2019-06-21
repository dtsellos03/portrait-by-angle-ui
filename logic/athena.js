var keys = require('../keyz.js');

var clientConfig = {
  bucketUri: 's3://rawstuff/',
  baseRetryWait: 0,
  retryWaitMax: 0
}

var awsConfig = {
  region: 'us-west-2',
    accessKeyId: keys.service,
    secretAccessKey: keys.secret
}

var _ = require('lodash');
var CSV = require('csv-string');

var athena = require("athena-client");

var fs = require('fs');


var client = athena.createClient(clientConfig, awsConfig)


function executeQuery() {
  return function(query, callback) {
    client.execute(query, (err, data) => {
        callback(null, _.get(data, 'records', []));
    })
  }
}

module.exports = executeQuery();
