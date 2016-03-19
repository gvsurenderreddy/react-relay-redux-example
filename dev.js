/* eslint no-console: 0 */
import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import {graphql} from 'graphql';
import graphqlHTTP from 'express-graphql';

const APP_PORT = 3000;

let app = express();
const compiler = webpack(config);

app = new WebpackDevServer(compiler, {
  hot: true,
  historyApiFallback: true,
  contentBase: 'src',
  proxy: {'/graphql': 'http://localhost/wordpress/wp/'},
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
 });

app.use(webpackHotMiddleware(compiler));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
