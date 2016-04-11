var getBabelRelayPlugin   = require('babel-relay-plugin');
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var request            = require('sync-request');
require('dotenv').config();

var response = request('POST', process.env.GRAPHQL_ENDPOINT, {
   json: {
      query: introspectionQuery
   }
});


var schema = JSON.parse(response.body.toString('utf-8'));

module.exports = getBabelRelayPlugin(schema.data, {
   abortOnError: true,
});