const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const bundler = webpack(webpackConfig);

browserSync({
  server: {
    baseDir: 'src/static/html',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        historyApiFallback: true,
        stats: { colors: true }
      }),

      webpackHotMiddleware(bundler)
    ]
  },

  open: false,
  files: [
    'src/static/html/**/*.html'
  ]
});
