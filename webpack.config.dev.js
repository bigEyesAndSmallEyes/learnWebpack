let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

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
    })
  ],
  module: {
    //less less-loader
    //node-sass sass-loader
    //stylus  stylus-loader
    rules: [
      {
        test: /\.css$/,
        use: [
          // style-loader
          {
            loader: "style-loader",
            options: {
              insert: function insertAtTop(element) {
                var parent = document.querySelector("head");
                var lastInsertedElement =
                  window._lastElementInsertedByStyleLoader;

                if (!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }

                window._lastElementInsertedByStyleLoader = element;
              }
            }
          },
          // css-loader
          {
            loader: "css-loader"
          },
        ]
      }, 
      {
        test: /\.less$/,
        use: [
          'style-loader', 'css-loader', 'less-loader'
        ]
      }
    ]
  }
};
