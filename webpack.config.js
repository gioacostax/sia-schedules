/* eslint-env node */
/* eslint no-process-env: 0 */

const webpack = require('webpack');
const path = require('path');

const config = {
  addVendor: (name, dir) => {
    config.resolve.alias[name] = dir;
    config.module.noParse.push(new RegExp(`^${name}$`));
  },

  debug: true,
  devtool: '#eval-source-map',

  entry: {
    app: [
      'webpack-hot-middleware/client',
      'webpack/hot/dev-server',
      './src/main.dev.jsx'
    ],
    vendors: [
      'jquery',
      'semantic',
      'semantic.css',
      'canvas'
    ]
  },

  resolve: {
    alias: {},
    root: path.resolve('.')
  },

  output: {
    path: `${__dirname}/src/static/html`,
    publicPath: '/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
    new webpack.optimize.CommonsChunkPlugin('app', null, false),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],

  externals: [''],

  module: {
    noParse: [],
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'react-hot',
          'babel'
        ]
      },
      {
        test: /\.(css)$/,
        loader: 'style!css'
      },
      {
        test: /\.(scss)$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(less)$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'
      }
    ]
  }
};

config.addVendor('jquery', `${__dirname}/bower_components/jquery/dist/jquery.min.js`);
config.addVendor('semantic', `${__dirname}/bower_components/semantic-ui/dist/semantic.min.js`);
config.addVendor('semantic.css', `${__dirname}/bower_components/semantic-ui/dist/semantic.min.css`);
config.addVendor('canvas', `${__dirname}/bower_components/html2canvas/build/html2canvas.min.js`);

module.exports = config;
