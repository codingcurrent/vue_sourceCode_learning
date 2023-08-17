const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bound.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'www'),
    compress: false,
    port: 8088,
    // 虚拟打包的路径，即bound.js文件并未实际生成
    publicPath: '/xuniPath/'
  }
}