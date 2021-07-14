const path = require('path');

module.exports = {
  lintOnSave:false,
  devServer:{
    contentBase: path.join(__dirname,'public'),
    port:8000,
    proxy: 'http://localhost:8401'
  },
  configureWebpack:{
    resolve:{
      alias:{
        '@v': path.resolve(__dirname,'src/views'),
        '@c': path.resolve(__dirname,'src/components'),
      }
    }
  },
}
