let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    //open: true,
    compress: true,
    contentBase: "./build"
  },
  mode: "development", //production development
  entry: "./src/index.js", // 入口
  output: {
    filename: "bundle.[hash:8].js", // 打包后的文件名
    path: path.resolve(__dirname, "build") //路径必须是一个绝对路径
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  module: { // 模块
    //less less-loader
    //node-sass sass-loader
    //stylus  stylus-loader
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')
              ]
            }
          }
        ]
      }, 
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
           'css-loader',
           {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')
              ]
            }
          },
           'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  }
};
