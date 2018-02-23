const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

var serverConfig = {
  target: 'node',
  context: path.resolve(__dirname, 'src/server'),
  node: {
    __dirname: false
  },
  entry: './server.js',
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'dist/server')
  }
};

var clientConfig = {
  context: path.resolve(__dirname, 'src/client'),
  entry: {
    display: './display.js',
    controller: './controller.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/client')
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    extractSass
  ]
};

module.exports = [ serverConfig, clientConfig ];
