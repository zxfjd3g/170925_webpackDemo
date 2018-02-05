/*
webpack生产环境配置
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

const baseConfig = require('./webpack.base.conf')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {
  // 入口
  entry: {
    // 指定第三方模块包含哪些
    vendor: ["jquery"]
  },

  // 出口
  output: {
    filename: 'static/js/[name].[chunkhash:10].js',
    publicPath: '/' // 在引用相对路径时, 在路径的左边加上/代表项目的根路径
  },

  // 模块加载器
  module: {
    rules: [
      // 处理css
      {
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader"]
        })
      }
    ]
  },

  // 插件
  plugins: [
    // 清理指定的目录
    new CleanPlugin(['dist'], {
      root: resolve('') // 项目根目录的绝对路径
    }),

    // 压缩css, 重复的样式也会被移除
    new OptimizeCssPlugin(),

    // 压缩JS
    new webpack.optimize.UglifyJsPlugin(),

    // 第三方包模块单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 将webpack模板代码单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),

    // 抽取js中所有css到指定的css文件
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css'  //[name]就是app
    })
  ]
})
