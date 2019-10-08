let path = require('path');


module.exports.server = {
  devServer: 
  {
    stats: 'normal',
    historyApiFallback: true,
    port:3000,
    compress: true
  }
};