const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
    disable: process.env.NODE_ENV === 'development'
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
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: [
  //             ['env', { targets: { node: '8.9.0' }}]
  //           ]
  //         }
  //       }
  //     }
  //   ]
  // }
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
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['react']
      //     }
      //   }
      // },
      {
        test: /\.s?css$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        use:'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',  // For bootstrap
      Popper: 'popper.js'  // For bootstrap
    }),
    extractSass
  ]
};

module.exports = [ serverConfig, clientConfig ];
