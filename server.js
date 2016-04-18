/* eslint no-console: 0 */
import path from 'path';
import express from 'express';
import proxy from 'express-http-proxy';
import request from 'request';
require('dotenv').config();

const APP_PORT = process.env.PORT || 3000;
let app = express();

app.use(express.static('./dist'));
app.post('/graphql', (req, res) => {
  req.pipe(request.post('http://localhost:8000/graphql', {json: req.body})).pipe(res);
});
app.get('*', function response(req, res, next) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
