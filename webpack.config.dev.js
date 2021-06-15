const webpack = require('webpack');
const path = require('path');

const serverConfig = {
  target: 'node',
  context: path.resolve(__dirname, 'src/server'),
  node: {
    __dirname: false
  },
  entry: ['@babel/polyfill', './server.js'],
  mode: 'development',
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
              ['@babel/preset-env', { targets: { node: 'current' }}]
            ]
          }
        }
      }
    ]
  }
};

const clientConfig = {
  context: path.resolve(__dirname, 'src/client'),
  devtool: 'inline-source-map',
  entry: {
    display: './display.js',
    index: './index.js'
  },
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/client/assets')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }
      }
    }
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
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['last 2 versions', 'IE 11']
                    }
                  }
                ],
                ['@babel/react']
              ]
            }
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              sourceMap: true,
              importLoaders: 1
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: 'assets'
          }
        }]
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: 'assets'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery', // For bootstrap
      Popper: 'popper.js' // For bootstrap
    })
  ]
};

module.exports = [serverConfig, clientConfig];
