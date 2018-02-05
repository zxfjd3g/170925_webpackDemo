const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {

  // 出口
  output: {
    filename: '[name].js'  // name的值为app
  },

  // 模块加载器
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
    ]
  },

  // 开启sourcemap
  devtool: 'cheap-module-eval-source-map'
})