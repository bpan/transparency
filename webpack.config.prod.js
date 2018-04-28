const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const serverConfig = {
  target: 'node',
  context: path.resolve(__dirname, 'src/server'),
  node: {
    __dirname: false
  },
  entry: ['babel-polyfill', './server.js'],
  mode: 'production',
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'dist/server')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', { targets: { node: 'current' }}]
            ]
          }
        }
      }
    ]
  }
};

const clientConfig = {
  context: path.resolve(__dirname, 'src/client'),
  entry: {
    display: './display.js',
    controller: './controller.js'
  },
  mode: 'production',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/client')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                [
                  'env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['last 2 versions', 'IE 11'],
                      uglify: false
                    }
                  }
                ],
                ['react']
              ]
            }
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: false,
              importLoaders: 1
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery', // For bootstrap
      Popper: 'popper.js' // For bootstrap
    }),
    new MiniCssExtractPlugin({
      allChunks: true,
      filename: '[name].css'
    })
  ]
};

module.exports = [serverConfig, clientConfig];
