var introspectionQuery = require('graphql/utilities').introspectionQuery;
var request            = require('sync-request');
import fs from 'fs';
require('dotenv').config();

var response = request('POST', process.env.GRAPHQL_ENDPOINT, {
   json: {
      query: introspectionQuery
   }
});


console.log(response);
//var schema = JSON.parse(response.body.toString('utf-8'));

fs.writeFileSync(
  path.join(__dirname, '../schema/schema.json'),
  JSON.stringify(response.body, null, 2)
);