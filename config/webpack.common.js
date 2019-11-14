const HTMLWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const path = require("path");

("dir", __dirname);

const htmlPlugin = new HTMLWebPackPlugin({
  template: "./src/index.html",
  filename: "index.html",
  title: "Legitrack"
});

const commonConfig = {
  entry: ["./src/index.js"],
  node: { fs: "empty" },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000
          }
        }
      }
    ]
  },
  plugins: [
    htmlPlugin,
    new webpack.ExternalsPlugin("commonjs", ["electron"]),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};

module.exports = commonConfig;
