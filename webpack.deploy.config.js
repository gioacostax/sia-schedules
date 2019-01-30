/* eslint-env node */

const webpack = require('webpack');
const Copy = require('copy-webpack-plugin');
const path = require('path');

const config = {
  addVendor: (name, dir) => {
    config.resolve.alias[name] = dir;
    config.module.noParse.push(new RegExp(`^${name}$`));
  },

  node: {
    Buffer: true,
    global: true,
    process: true,
    setImmediate: false
  },

  entry: {
    app: [
      './src/main.jsx'
    ],
    vendors: [
      'jquery',
      'semantic',
      'semantic.css',
      'react',
      'react-dom',
      'siajs',
      'canvas'
    ]
  },

  resolve: {
    alias: {},
    root: path.resolve('.')
  },

  output: {
    path: `${__dirname}/build/addon/chrome/app`,
    publicPath: '/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new Copy([{ from: './src/static/addon', to: '../../' }]),
    new Copy([{ from: './src/static/html', to: './' }]),
    new webpack.optimize.CommonsChunkPlugin('app', null, false),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })
  ],

  externals: [''],

  module: {
    noParse: [],
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules)/,
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
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url?limit=100000'
      }
    ]
  }
};

config.addVendor('jquery', `${__dirname}/src/static/vendors/jquery.min.js`);
config.addVendor('semantic', `${__dirname}/src/static/vendors/semantic.min.js`);
config.addVendor('semantic.css', `${__dirname}/src/static/vendors/semantic.min.css`);
config.addVendor('react', `${__dirname}/src/static/vendors/react.min.js`);
config.addVendor('react-dom', `${__dirname}/src/static/vendors/react-dom.min.js`);
config.addVendor('canvas', `${__dirname}/src/static/vendors/html2canvas.min.js`);

module.exports = config;
