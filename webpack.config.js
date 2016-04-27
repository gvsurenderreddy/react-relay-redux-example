'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
var autoprefixer = require('autoprefixer');

const devServer = {
    contentBase: path.resolve(__dirname, './app'),
    outputPath: path.join(__dirname, './dist'),
    colors: true,
    quiet: false,
    noInfo: false,
    publicPath: '/',
    historyApiFallback: false,
    host: '127.0.0.1',
    port: 3000,
    hot: true
};

module.exports = {
  devtool: 'eval-source-map',
  debug: true,
  devServer: devServer,
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: devServer.publicPath
  },
  module: {
    loaders: [
      {
        test: /isIterable/,
        loader: 'imports?Symbol=>false'
      },
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules|lib/,
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=2&localIdentName=[local]',
          'postcss',
          'sass?sourceMap'
        ],
        include: /app\/styles.scss|app\/components\/Page/
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=2&localIdentName=[path]___[name]__[local]',
          'postcss',
          'sass?sourceMap'
        ],
        exclude: /node_modules|lib|app\/components\/Page|app\/styles.scss/
      },
      {
        test: /\.(jpg|ttf|eot|woff2|woff|svg|png)?$/,
        loader: "url-loader"
      }
    ],
  },
  postcss: [autoprefixer],
  plugins: [
    new WriteFilePlugin(),
    new ExtractTextPlugin('app/styles.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ],
  node: {
    fs: 'empty'
  }
};
