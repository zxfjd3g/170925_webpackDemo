/*
webpack基本配置
 */
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
/*
webpack开发环境配置
 */

// __dirname代表当前文件所在的目录(build)
// ..回退到上一级
function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  // 入口
  entry: {
    app: './src/index.js'
  },
  // 出口
  output: {
    path: resolve('dist')
  },

  // 模块加载器
  module: {
    rules: [
      // 处理js es6-->es5
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      // 处理img
      {
        test: /\.(png|jpe?g|gif|svg|bmp)$/,
        loader: 'url-loader',  //对小图片进行BASE64处理
        options: {
          limit: 1024*5,
          name: 'static/img/[name].[hash:8].[ext]' // 生成的文件路径和文件名
        }
      }
    ]
  },

  // 插件
  plugins: [
    new HtmlPlugin({
      template: 'index.html',  // 命令所在的目录
      filename: 'index.html', //dist目录
      inject: true //自动注入js/css
    })
  ]

}