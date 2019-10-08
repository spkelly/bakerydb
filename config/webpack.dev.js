const common = require('./webpack.common');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const path = require('path');


const devConfig = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

};

module.exports = merge(devConfig,parts.server);