'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');

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
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules|lib/,
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]',
          'sass?sourceMap'
        ],
        exclude: /node_modules|lib/
      },
      { test: /\.(jpg|ttf|eot|woff2|woff|svg)?$/, loader: "url-loader" },
    ],
  },
  plugins: [
    new WriteFilePlugin(),
    new ExtractTextPlugin('app.css', {
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
