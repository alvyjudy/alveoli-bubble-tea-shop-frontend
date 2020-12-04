const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry:"./src/index.js",
  mode:"development",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
  },
  module:{
    rules: [
      {
        test:/\.js$/, 
        exclude:/node_modules/, 
        loader:"babel-loader",
      },
      {
        test:/\.css$/,
        use:[
          "style-loader",
          {
            loader: "css-loader",
            options:{
              modules:true,
            }
          }
        ]
      }
    ],
  },
  devServer:{
    contentBase:"./dist",
    port: 3001,
    host: "0.0.0.0",
    proxy: {
      "/api":"http://localhost:3002"
    },
    historyApiFallback: true,
  }
}