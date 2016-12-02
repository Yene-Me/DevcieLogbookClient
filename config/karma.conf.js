var webpackConfig = require('./webpack.test');

module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['jasmine', 'browserify'],

    files: [
      {pattern: './karma-test-shim.js', watched: false}
    ],

    preprocessors: {
      '../config/karma-test-shim.js': [ 'webpack','sourcemap' ]
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: false
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-requirejs',
      'karma-webpack',
      'karma-browserify',
      'karma-sourcemap-loader',
      'karma-commonjs-require'
     
    ],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    //browsers: ['Chrome'],
    singleRun: false
  };

  config.set(_config);
};
