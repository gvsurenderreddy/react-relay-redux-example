var getBabelRelayPlugin   = require('babel-relay-plugin');
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var request            = require('sync-request');

var url = 'http://localhost/wordpress/wp/graphql';
//var url = 'http://wordexpress.io:8080/';

var response = request('POST', url, {
   json: {
      query: introspectionQuery
   }
});


var schema = JSON.parse(response.body.toString('utf-8'));

module.exports = getBabelRelayPlugin(schema.data, {
   abortOnError: true,
});