const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const fs = require("fs");
const open = require("open");
const WebpackOnBuildPlugin = require("on-build-webpack");

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry"
                }
              ]
            ]
          }
        }
      }
    ]
  },
  entry: {
    app: "./src/index.js"
  },

  devtool: "",

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inlineSource: ".(js|css)$"
    }),

    new HtmlWebpackInlineSourcePlugin(),
    new WebpackOnBuildPlugin(function(stats) {
      // open("fmp://$/WSviewer.fmp12?script=render");
    })
  ],
  optimization: {
    usedExports: true
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
