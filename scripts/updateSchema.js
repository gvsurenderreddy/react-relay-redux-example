var introspectionQuery = require('graphql/utilities').introspectionQuery;
var request            = require('sync-request');
import fs from 'fs';

var url = 'http://localhost/wordpress/wp/graphql';
//var url = 'http://wordexpress.io:8080/';

var response = request('POST', url, {
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