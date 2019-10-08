const common = require('./config/webpack.common');
const devConfig = require('./config/webpack.dev');
const prodConfig = require('./config/webpack.prod');
const merge = require('webpack-merge');

const env = process.env.NODE_ENV;


module.exports = () =>{
  console.log("the mode ", env);

  if(env === 'production'){
    return merge(common,prodConfig, {'mode':env});
  }
  else{
    return merge(common,devConfig,{'mode':env});
  }
}