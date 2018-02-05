const path = require('path')  // node内置的用来操作路径的包
// __dirname: node中内置的一个变量: 它的值为当前文件所在的目录的绝对路径
const HtmlPlugin = require('html-webpack-plugin')

// 得到项目下指定文件夹名称的绝对路径
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 入口
  entry: './src/index.js',  // 入口js相对路径(相对于webpack命令所在的目录)

  // 出口
  output: {
    path: resolve('dist'), // 所有输出文件的文件夹的绝对路径
    filename: 'bundle.js'  // 打包js文件名
  },

  // 模块加载器
  module: {
    rules: [
      // 加载JS: es6转换为es5
      {
        test: /\.js$/, // 处理哪些文件
        loader: 'babel-loader', // 哪个loader来处理
        include: [resolve('src')] // 对哪些文件夹下的模块进行处理
      },
      // 加载css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // style(css('xxx.css'))
      },
      // 加载img
      {
        test: /\.(png|bmp|jpe?g|gif|svg)$/,
        use: 'file-loader'
      }
    ]
  },


  // 插件
  plugins: [// 配置多个插件实例
    new HtmlPlugin({
      // 模块html文件
      template: 'index.html', // 自动在命令所在的目录查找
      // 生成html文件
      filename: 'index.html',  //output.path指定的目录
      // 标识是否自动注入打包生成的js/css
      inject: true // 注入
    })
  ]

}