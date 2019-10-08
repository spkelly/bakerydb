const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const prodConfig = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  stats:{
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: true,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: false,
    errorDetails: false,
    warnings: false,
    publicPath: false
  },
  optimization:{
    minimize:true,
    concatenateModules: true,
  }
};

module.exports = prodConfig;